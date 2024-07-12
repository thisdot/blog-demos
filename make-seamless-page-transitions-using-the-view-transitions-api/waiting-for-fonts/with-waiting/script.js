import { getPageContent, onLinkNavigate } from '/utils.js';

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageContent(toPath);
  const transition = document.createDocumentTransition();
  
  transition.start(async () => {
    document.body.innerHTML = content;
    await document.fonts.ready;
  });
});
