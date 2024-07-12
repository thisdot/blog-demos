crossDocVTHelper({
  routes: [
    ['home', '/mpa-expanding-image/'],
    ['article', '/mpa-expanding-image/articles/*'],
  ],
  prepareOutgoingPage(fromPageType, toPageType, toURL) {
    if (fromPageType === 'home' && toPageType === 'article') {
      // Get the thumbnail relevant to the next page
      const toPagePath = new URL(toURL).pathname;
      const targetThumbnail = document.querySelector(
        `a[href="${toPagePath}"] img`,
      );

      if (targetThumbnail) {
        // Give it a view-transition-name
        targetThumbnail.style.viewTransitionName = 'banner-img';

        // Remove the view-transition-name if the page returns from bfcache
        addEventListener(
          'pageshow',
          () => {
            targetThumbnail.style.viewTransitionName = '';
          },
          { once: true },
        );
      }
    }
  },
  handleTransition(transition, fromPageType, toPageType, fromURL) {
    if (fromPageType === 'article' && toPageType === 'home') {
      const fromPagePath = new URL(fromURL).pathname;

      // This runs before <body>, so we use withElement to try to get hold of the element before the transition starts.
      transition.withElement(`a[href="${fromPagePath}"] img`, (el) => {
        console.log('adding');
        // Give it a view-transition-name
        el.style.viewTransitionName = 'banner-img';

        // Remove the view-transition-name when the transition is done.
        transition.finished.then(() => {
          console.log('removed');
          el.style.viewTransitionName = '';
        });
      });
    }
  },
});
