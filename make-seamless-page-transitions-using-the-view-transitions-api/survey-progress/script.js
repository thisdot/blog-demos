import { getPageContent, onLinkNavigate } from '../utils.js';

const getStep = (path) => /step-(\d)\.html$/.exec(path)?.[1] || '1';

onLinkNavigate(async ({ toPath, fromPath }) => {
  const content = await getPageContent(toPath);
  const fromStep = getStep(fromPath);
  const toStep = getStep(toPath);

  startViewTransition(() => {
    // This is a pretty heavy-handed way to update page content.
    // In production, you'd likely be modifying DOM elements directly,
    // or using a framework.
    // innerHTML is used here just to keep the DOM update super simple.
    document.documentElement.style.setProperty('--from-step', fromStep);
    document.documentElement.style.setProperty('--step', toStep);
    document.body.innerHTML = content;
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