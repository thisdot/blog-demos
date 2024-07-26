import { getPageContent, onLinkNavigate, transitionHelper } from '../utils.js';

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageContent(toPath);
  
  const transition = transitionHelper({
    updateDOM() {
      document.documentElement.style.filter = 'blur(3px)';
      document.body.innerHTML = content;
    }
  });
  
  transition.finished.then(() => {
    document.documentElement.style.filter = '';
  });
});


// A little helper function like this is really handy
// to handle progressive enhancement.
function startViewTransition(callback) {
  if (!document.startViewTransition) {
    callback();
    return;
  }
  
  document.startViewTransition(callback);
}