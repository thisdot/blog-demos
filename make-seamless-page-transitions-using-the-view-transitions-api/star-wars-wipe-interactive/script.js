import { getPageContent, onLinkNavigate, transitionHelper } from '../utils.js';

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageContent(toPath);
  
  const transition = transitionHelper({
    updateDOM() {
      // This is a pretty heavy-handed way to update page content.
      // In production, you'd likely be modifying DOM elements directly,
      // or using a framework.
      // innerHTML is used here just to keep the DOM update super simple.
      document.body.innerHTML = content;
    }
  });
});
