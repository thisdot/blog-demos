import { getPageContent, onLinkNavigate, transitionHelper } from '../utils.js';

// Listen for clicks on the back heading button, and turn them into real traversals
addEventListener('click', (event) => {
  const backLink = event.target.closest('.back-and-title');
  if (!backLink || event.button !== 0 || !self.navigation) return;
    
  const entries = navigation.entries();
  const backEntry = entries[navigation.currentEntry.index - 1];

  if (!backEntry || backEntry.url !== backLink.href) return;
  event.preventDefault();
  navigation.back();  
});


onLinkNavigate(async ({ toPath, isBack }) => {
  const content = await getPageContent(toPath);
  const classNames = isBack ? 'back-transition' : '';
  
  transitionHelper({
    classNames,
    updateDOM() {
      // This is a pretty heavy-handed way to update page content.
      // In production, you'd likely be modifying DOM elements directly,
      // or using a framework.
      // innerHTML is used here just to keep the DOM update super simple.
      document.body.innerHTML = content;
    }
  });
});
