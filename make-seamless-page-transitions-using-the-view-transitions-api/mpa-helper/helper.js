var crossDocVTHelper = (function () {
    'use strict';

    /** Promise for next animation frame */
    const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));
    function isVTAnim(anim) {
        const effect = anim.effect;
        if (!(effect instanceof KeyframeEffect))
            return false;
        return (effect.target === document.documentElement &&
            effect.pseudoElement?.startsWith(`::view-transition`));
    }
    /** Are there any active animations relating to a root view transition? */
    function hasVTAnims() {
        return document.getAnimations().some((anim) => isVTAnim(anim));
    }
    /** Get active animations relating to a root view transition */
    function getVTAnims() {
        return document.getAnimations().filter((anim) => isVTAnim(anim));
    }
    function supportsCrossDocViewTransition() {
        // This is a best-guess. It isn't sufficient.
        if (!('ViewTransition' in self))
            return false;
        // Look for <meta name="view-transition" content="same-origin">
        return Boolean(document.head.querySelector('meta[name="view-transition"][content="same-origin"]'));
    }

    class CrossDocViewTransition {
        #delayStartCalled = false;
        #delayStartCallable = true;
        #readyResolve;
        /** The transition is just about to start */
        ready;
        /** All transitions animations are complete, and the new view is visible */
        finished;
        constructor() {
            this.ready = new Promise((resolve) => {
                this.#readyResolve = resolve;
            });
            this.finished = this.ready.then(async () => {
                while (true) {
                    const anims = getVTAnims();
                    if (anims.length === 0)
                        return;
                    await Promise.all(anims.map((anim) => anim.finished));
                    await frame();
                }
            });
            queueMicrotask(() => {
                this.#delayStartCallable = false;
                // This may have already been resolved in `delayStart`,
                // but in case it hasn't:
                this.#readyResolve();
            });
        }
        delayStart(promise) {
            if (!this.#delayStartCallable) {
                throw Error(`delayStart must be called synchronously within the transition callback`);
            }
            if (this.#delayStartCalled) {
                throw Error(`delayStart can only be called once - if you have use-cases for calling it multiple times, let me know`);
            }
            this.#delayStartCalled = true;
            this.#readyResolve(Promise.resolve(promise).then(() => { }));
        }
    }

    let tooLateToCallHelper = false;
    class PrepareTransitionEvent extends Event {
        destination;
        direction;
        constructor(destination, direction) {
            super('preparetransition');
            this.destination = destination;
            this.direction = direction;
        }
    }
    const lifecycleEventTarget = new EventTarget();
    function potentialTransitionStart() {
        if (!supportsCrossDocViewTransition())
            return;
        // Doesn't look like there's going to be a view transition.
        if (!hasVTAnims())
            return;
        lifecycleEventTarget.dispatchEvent(new Event('transition'));
    }
    addEventListener('pageshow', async (event) => {
        // Ignore the initial pageshow
        if (!event.persisted)
            return;
        lifecycleEventTarget.dispatchEvent(new Event('transitionsetup'));
        await frame();
        potentialTransitionStart();
    });
    if (self.navigation) {
        self.navigation.addEventListener('navigate', (event) => {
            const { url, index } = event.destination;
            const parsedURL = new URL(url);
            if (parsedURL.origin !== location.origin)
                return;
            const currentIndex = self.navigation.currentEntry?.index || 0;
            const isBack = index !== -1 && index < currentIndex;
            lifecycleEventTarget.dispatchEvent(new PrepareTransitionEvent(url, isBack ? 'back' : 'forward'));
        });
    }
    // This intent is that this library executes before the first frame of the page load.
    // This handles the potential initial render transition:
    (async () => {
        if (document.body) {
            console.warn(`cross-doc-view-transition should be loaded in the <head>, before <body> is parsed.`);
        }
        await frame();
        potentialTransitionStart();
        tooLateToCallHelper = true;
    })();

    let helperCalled = false;
    function crossDocVTHelper({ handleTransition = () => { }, prepareOutgoingPage = () => { }, routes = [], }) {
        if (!supportsCrossDocViewTransition())
            return;
        if (helperCalled) {
            throw Error(`Only call the helper once per page.`);
        }
        helperCalled = true;
        if (tooLateToCallHelper) {
            throw Error(`crossDocVTHelper called too late. Must be called before the first frame (eg, in the <head>).`);
        }
        const processedRoutes = routes.map(([name, patternInit]) => {
            if (typeof patternInit === 'string') {
                patternInit = { pathname: new URL(patternInit, location.href).pathname };
            }
            return [
                name,
                new URLPattern({ search: '*', hash: '*', ...patternInit }),
            ];
        });
        function getPageType(url) {
            const route = processedRoutes.find(([name, pattern]) => pattern.test(url));
            if (route)
                return route[0];
            return 'unknown';
        }
        let addedClasses = [];
        function addClass(str) {
            document.documentElement.classList.add(str);
            addedClasses.push(str);
        }
        function removeAddedClasses() {
            for (const className of addedClasses) {
                document.documentElement.classList.remove(className);
            }
            addedClasses = [];
        }
        lifecycleEventTarget.addEventListener('preparetransition', (event) => {
            // When coming out of bfcache, remove any previous classes.
            removeAddedClasses();
            const { destination, direction } = event;
            const toPageType = getPageType(destination);
            const fromPageType = getPageType(location.href);
            addClass(`to-${toPageType}`);
            addClass(`from-${fromPageType}`);
            addClass(`direction-${direction}`);
            addClass(`old-page`);
            sessionStorage.setItem('vt-last-url', location.href);
            sessionStorage.setItem('vt-direction', direction);
            prepareOutgoingPage(fromPageType, toPageType);
        });
        let toPageType;
        let fromPageType;
        function transitionSetup() {
            toPageType = getPageType(location.href);
            fromPageType = getPageType(sessionStorage.getItem('vt-last-url') || '');
            addClass(`to-${toPageType}`);
            addClass(`from-${fromPageType}`);
            addClass(`direction-${sessionStorage.getItem('vt-direction') || 'forward'}`);
            addClass(`new-page`);
        }
        lifecycleEventTarget.addEventListener('transitionsetup', () => transitionSetup());
        // Also a transition setup for the initial page load.
        transitionSetup();
        lifecycleEventTarget.addEventListener('transition', async () => {
            const transition = new CrossDocViewTransition();
            handleTransition(transition, fromPageType, toPageType);
            const anims = getVTAnims();
            // Delay the transition animations until eveything is ready.
            for (const anim of anims)
                anim.pause();
            await transition.ready;
            for (const anim of anims)
                anim.play();
            await transition.finished;
            removeAddedClasses();
        });
    }

    return crossDocVTHelper;

})();
