const oldView = document.querySelector('.old-view');
const newView = document.querySelector('.new-view');

document.querySelector('.toggle').addEventListener('click', async () => {
  const transition = document.startViewTransition(() => {
    oldView.classList.toggle('hidden');
    newView.classList.toggle('hidden');  
  });
  
  await transition.ready;
  
  const anims = document.getAnimations();
  for (const anim of anims) anim.pause();
  
  let time = 0;
  
  for (const anim of anims) {
    anim.finished.then(
      () => console.log('animation finished (promise)'),
      (err) => console.log('animation finished promise rejected', err),
    );
    
    anim.addEventListener('finish', () => {
      console.log('animation finished (event)');
    });
  } 
  
  
  for (const anim of anims) anim.currentTime = 250;
  
  /*function frame() {
    for (const anim of anims) anim.currentTime = time;
    time++;
    console.log(time);
    
    if (time > 500) return;
    requestAnimationFrame(frame);
  }
  
  frame();*/
  
  await transition.finished.catch(() => {});
  
  console.log('Transition finished despite all animations paused - This should not happen');
});
