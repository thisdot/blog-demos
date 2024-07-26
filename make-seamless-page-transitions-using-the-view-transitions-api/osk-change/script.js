import { getPageContent, onLinkNavigate } from '../utils.js';

const pageCache = Object.fromEntries(
  ['./', './page-2.html']
    .map((path) => new URL(path, location).pathname)
    .map((fullPath) => [fullPath, getPageContent(fullPath)])
);

onLinkNavigate(async ({ toPath }) => {
  const content = await pageCache[toPath];
  const transition = document.createDocumentTransition();
  
  transition.start(() => {
    document.body.innerHTML = content;  
  });
});
