type DocumentOrShadowRoot = Document | ShadowRoot;

const documentStylesheets: { [key: string]: DocumentOrShadowRoot[] } = {};
const sharedStylesheets: { [key: string]: CSSStyleSheet } = {};

export function injectSharedStylesheet(
  element: Element,
  id: string,
  content: string
) {
  const root = element.getRootNode() as DocumentOrShadowRoot;
  const targetDocument = root === document ? document : root;

  if (targetDocument.adoptedStyleSheets != null) {
    evictDisconnectedRoots();

    const rootNodes = documentStylesheets[id] ?? [];
    if (rootNodes.find(value => value === targetDocument)) {
      return;
    }

    let sharedStylesheet = sharedStylesheets[id];
    if (sharedStylesheet == null) {
      sharedStylesheet = new CSSStyleSheet();
      sharedStylesheet.replaceSync(content);
      sharedStylesheets[id] = sharedStylesheet;
    }

    targetDocument.adoptedStyleSheets.push(sharedStylesheet);
    if (documentStylesheets[id] != null) {
      documentStylesheets[id].push(targetDocument);
    } else {
      documentStylesheets[id] = [targetDocument];
    }
  } else {
    // FALLBACK: Inject <style> manually into the document if adoptedStyleSheets
    // is not supported.

    const target = root === document ? document.head : root;
    if (target?.querySelector(`#${id}`)) {
      return;
    }

    const styleElement = document.createElement('style');
    styleElement.id = id;
    styleElement.appendChild(document.createTextNode(content));

    target.appendChild(styleElement);
  }
}

function evictDisconnectedRoots() {
  Object.entries(documentStylesheets).forEach(([id, roots]) => {
    documentStylesheets[id] = roots.filter(root => root.isConnected);
  });
}
