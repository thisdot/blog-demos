import { getPageContent, onLinkNavigate } from '/utils.js';

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageContent(toPath);
  const transition = document.createDocumentTransition();
  
  transition.start(() => {
    document.body.innerHTML = content;  
  });
});
