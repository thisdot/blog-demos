import { getPageContent, onLinkNavigate, transitionHelper } from '../utils.js';

function decodeBatmanImage() {
  const img = new Image();
  img.src = 'batman.svg';
  return img.decode();
}

// The context is connected to the device speakers.
// You only need one of these per document.
const context = new AudioContext();

async function getBatmanSound() {  
  const response = await fetch('https://cdn.glitch.global/b2a0e9e8-12a2-4158-b2d8-11ef08ab8d68/batman.aac?v=1675524264205');
  const arrayBuffer = await response.arrayBuffer();
  return context.decodeAudioData(arrayBuffer);
}

const batmanSoundPromise = getBatmanSound();

function playSound(audioBuffer) {
  // Create a source:
  // This represents a playback head.
  const source = context.createBufferSource();
  // Give it the audio data we loaded:
  source.buffer = audioBuffer;
  // Plug it into the output:
  source.connect(context.destination);
  // And off we go!
  source.start();
}

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageContent(toPath);
  const div = document.createElement('div');
  div.style.viewTransitionName = 'batman';
  div.style.contain = 'paint';
  document.body.append(div);
  
  const transition = transitionHelper({
    async updateDOM() {
      // This is a pretty heavy-handed way to update page content.
      // In production, you'd likely be modifying DOM elements directly,
      // or using a framework.
      // innerHTML is used here just to keep the DOM update super simple.
      document.body.innerHTML = content;
      await decodeBatmanImage();
    }
  });
  
  transition.ready.then(async () => {
    playSound(await batmanSoundPromise);
  })
});
