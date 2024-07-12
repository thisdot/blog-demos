const $ = (...args) => document.querySelector(...args);

const demoIframe = $('.demo-iframe');
const urlForm = $('.url-form');
const urlInput = $('.url-input');
const posInput = $('.pos-input');
const playButton = $('.play-button');
const style = document.createElement('style');

style.textContent = `
  ::view-transition-old(*) {
    outline: 2px dashed red;
  }
  ::view-transition-new(*) {
    outline: 2px dotted green;
  }
  ::view-transition-group(*) {
    outline: 2px dashed blue;
  }
`;

function setIframeUrl() {
  demoIframe.src = urlInput.value;
}

urlForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setIframeUrl();
})

demoIframe.addEventListener('load', () => {
  const startViewTransition = demoIframe.contentDocument.startViewTransition;
  
  demoIframe.contentDocument.startViewTransition = function(...args) {
    const transition = startViewTransition.call(demoIframe.contentDocument, ...args);
    hijackTransition(demoIframe.contentDocument, transition);
    return transition;
  };
  
  demoIframe.contentDocument.head.append(style);
});

let activeAnims = null;
let maxTime = 0;

async function hijackTransition(doc, transition) {
  await transition.ready;
  
  const anims = doc.getAnimations().filter(
    (anim) => anim.effect.target === doc.documentElement && anim.effect.pseudoElement.startsWith('::view-transition')
  );
  for (const anim of anims) anim.pause();
  
  activeAnims = anims;
  for (const anim of anims) anim.finished.then(() => console.log('yo'));
  
  maxTime = Math.max(
    ...anims.map((anim) => {
      const { delay, duration } = anim.effect.getTiming();
      return delay + duration;
    })
  );
  
  posInput.disabled = false;
  playButton.disabled = false;
  
  await transition.finished;
  
  posInput.disabled = true;
  playButton.disabled = true;
}

playButton.addEventListener('click', (event) => {
  event.preventDefault();
  for (const anim of activeAnims) anim.play();
});

posInput.addEventListener('input', () => {
  const time = Math.min(posInput.value * maxTime, maxTime - 0.1);
  for (const anim of activeAnims) anim.currentTime = time;
});

setIframeUrl();