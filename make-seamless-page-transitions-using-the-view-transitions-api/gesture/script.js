import { onLinkNavigate, transitionHelper } from '../utils.js';

const mainPageShell = `
  <header class="main-header">
    <span class="main-header-text">Demo site</span>
  </header>
  <main class="content"></main>
  <gesture-transition href="./page-2.html" direction="forward">Page 2</gesture-transition>
`;
const otherPageShell = `
  <header class="main-header">
    <a href="./" class="back-and-title">
      <svg class="back-icon" viewBox="0 0 24 24"><path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"></path></svg>
      <span class="main-header-text">Demo site</span>
    </a>
  </header>
  <main class="content"></main>
  <gesture-transition href="./" direction="back">Page 2</gesture-transition>
`;

function getShell(path) {
  if (path === '/gesture/') return mainPageShell;
  return otherPageShell;
}

export async function getPageInnerContent(url) {
  // This is a really scrappy way to do this.
  // Don't do this in production!
  const response = await fetch(url);
  const text = await response.text();
  // Particularly as it uses regexp
  return /<main[^>]*>([\w\W]*)<\/main>/.exec(text)[1];
}

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageInnerContent(toPath);
  
  transitionHelper({
    classNames: 'default-transition',
    updateDOM() {
      // This is a pretty heavy-handed way to update page content.
      // In production, you'd likely be modifying DOM elements directly,
      // or using a framework.
      // innerHTML is used here just to keep the DOM update super simple.
      document.body.innerHTML = getShell(toPath);
      document.querySelector('main').innerHTML = content;
    }
  });
});

const gestureTransitionStyles = new CSSStyleSheet();
gestureTransitionStyles.replace(`
  :host {
    background: #aaa;
    fill: #fff;
    overflow: hidden;
    color: transparent;
    border-radius: 1000px 0 0 1000px;
    aspect-ratio: 1 / 2;
    width: 60px;
    touch-action: none;
  }
  
  :host([direction=back]) {
    border-radius: 0 1000px 1000px 0;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 130%;
    height: 100%;
  }
  
  :host([direction=back]) svg {
    left: auto;
    right: 0;
    scale: -1 1;
  }
  
  a {
    position: absolute;
    inset: 0;
  }
  
  slot {
    display: block;
    opacity: 0;
  }
`);

customElements.define(`gesture-transition`, class extends HTMLElement {
  static observedAttributes = ['href'];
  
  #shadowRoot = null;
  #link = null;
  #everConnected = false;
  
  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({ mode: 'closed' });
    this.#shadowRoot.adoptedStyleSheets = [gestureTransitionStyles];
    this.#shadowRoot.innerHTML = `
      <a href="about:blank">
        <svg viewBox="0 0 48 48"><path d="m18.8 36-2.2-2.1 9.9-10-9.9-9.8 2.1-2.2 12.1 12Z"/></svg>
        <slot></slot>
      </a>
    `;
    this.#link = this.#shadowRoot.querySelector('a');
  }
  
  #attributes = {
    href: (oldValue, newValue) => {
      this.#link.href = newValue;
    }
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    this.#attributes[name]?.(oldValue, newValue);
  }
  
  #initialConnected() {
    this.addEventListener('click', (event) => {
      if (event.button === 0) event.preventDefault();
    });

    let activeGesture = false;

    this.addEventListener('pointerdown', async (downEvent) => {
      if (activeGesture || !(event.buttons & 1)) return;
      activeGesture = true;

      const initialPath = location.pathname;
      const toPath = new URL(this.#link.href).pathname;
      const controller = new AbortController();
      const slideTime = 300;
      const back = this.getAttribute('direction') === 'back';
      
      let activeAnims;
      let startX = downEvent.pageX;
      let latestX = startX;
      let abortDirection = false;

      const done = async (upEvent) => {
        if (downEvent.pointerId !== upEvent.pointerId) return;
        controller.abort();
        activeGesture = false;
        
        if (activeAnims) {
          if (!abortDirection) {
            for (const anim of activeAnims) {
              anim.play();
            }
            return;
          }
          
          const contentPromise = getPageInnerContent(initialPath);
          navigation.back({ info: 'ignore' });
          
          // Prevent the animation ending
          const holdingAnim = document.documentElement.animate({}, {
            duration: 100,
            pseudoElement: '::view-transition-new(root)',
          });
          holdingAnim.pause();
          
          for (const anim of activeAnims) {
            anim.reverse();
            anim.play();
          }
          
          await Promise.all(activeAnims.map((a) => a.finished));
          const content = await contentPromise;
          holdingAnim.cancel();
          document.body.innerHTML = getShell(initialPath);
          document.querySelector('main').innerHTML = content;
        }
      };

      const updateAnims = () => {
        // Transition not ready yet?
        if (!activeAnims) return;

        const currentTime = Math.max(
          0,
          Math.min(
            // Work around anim end bug
            slideTime - 0.001,
            (back ? latestX - startX : startX - latestX) / innerWidth * slideTime
          )
        );

        for (const anim of activeAnims) {
          anim.currentTime = currentTime;
        }
      };

      for (const eventName of ['pointerup', 'pointercancel']) {
        document.addEventListener(eventName, done, { signal: controller.signal });
      }

      document.addEventListener('pointermove', (moveEvent) => {
        if (downEvent.pointerId !== moveEvent.pointerId) return;
        abortDirection = back ? moveEvent.pageX < latestX : latestX < moveEvent.pageX;
        latestX = moveEvent.pageX;
        updateAnims();
      }, { signal: controller.signal });

      const contentPromise = getPageInnerContent(toPath);

      const transition = transitionHelper({
        classNames: back ? 'linear-slide-back' : 'linear-slide',
        updateDOM() {
          document.body.innerHTML = getShell(toPath);
        }
      });

      transition.updateCallbackDone.then(async () => {
        navigation.navigate(toPath, { info: 'ignore' });
        document.querySelector('main').innerHTML = await contentPromise;
      });

      await transition.ready;

      activeAnims = document.getAnimations().filter(
        (anim) => anim.effect.target === document.documentElement && anim.effect.pseudoElement.startsWith('::view-transition')
      );
      for (const anim of activeAnims) anim.pause();

      updateAnims();
    });
  }
  
  connectedCallback() {
    if (!this.#everConnected) {
      this.#initialConnected();
      this.#everConnected = true;
    }
  }
});
