const style = document.createElement("style");
const styleMap = new Map();

export function getStyleDeclaration(selector) {
  if (!styleMap.has(selector)) {
    if (!style.isConnected) document.head.append(style);
    
    const newIndex = style.sheet.cssRules.length;
    style.sheet.insertRule(`${selector} {}`, newIndex);
    const styleRule = style.sheet.cssRules[newIndex];
    styleMap.set(selector, styleRule.style);
  }
  return styleMap.get(selector);
}

export function assignStyles(selector, styles) {
  Object.assign(getStyleDeclaration(selector), styles);
}
