import { createRenderer } from 'solid-js/universal';

const PROPERTIES = new Set(['classNames', 'textContent']);

export const {
  render,
  effect,
  memo,
  createComponent,
  createElement,
  createTextNode,
  insertNode,
  insert,
  spread,
  setProp,
  mergeProps,
} = createRenderer({
  createElement(type) {
    return document.createElement(type);
  },
  createTextNode(text) {
    return document.createTextNode(text);
  },
  replaceText(node, text) {
    node.data = text;
  },
  insertNode(parent, node, anchor) {
    console.log(node);
    parent.insertBefore(node, anchor);
  },
  removeNode(parent, node) {
    parent.removeChild(node);
  },
  setProperty(node, name, value) {
    if (name === 'style') Object.assign(node.style, value);
    else if (name.startsWith('on')) node[name.toLowerCase()] = value;
    else if (PROPERTIES.has(name)) node[name] = value;
    else node.setAttribute(name, value);
  },
  isTextNode(node) {
    console.log(node);
    return node.type === 3;
  },
  getParentNode(node) {
    return node.parentNode;
  },
  getFirstChild(node) {
    return node.firstChild;
  },
  getNextSibling(node) {
    return node.nextSibling;
  },
});
