const video = document.querySelector('.main-video');

document.querySelector('.toggle-video-position-default').addEventListener('click', () => {
  transition('', () => {
    video.classList.toggle('overlay');  
  });
});

document.querySelector('.toggle-video-position-default-slow').addEventListener('click', () => {
  transition('slow', () => {
    video.classList.toggle('overlay');  
  });
});

document.querySelector('.toggle-video-position').addEventListener('click', () => {
  transition('move-video', () => {
    video.classList.toggle('overlay');  
  });
});

document.querySelector('.toggle-video-position-slow').addEventListener('click', () => {
  transition('move-video slow', () => {
    video.classList.toggle('overlay');  
  });
});


async function transition(className, callback) {
  if (!document.startViewTransition) {
    callback();
    return;
  }
  
  const classes = className.split(' ').map(s => s.trim()).filter(Boolean);
  
  document.documentElement.classList.add(...classes);
  
  try {
    const transition = document.startViewTransition(callback);
    await transition.finished;  
  } finally {
    document.documentElement.classList.remove(...classes);
  }
}