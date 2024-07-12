const dialogContainer = document.querySelector('.fake-dialog-container');

document.querySelector('.open-dialog').addEventListener('click', () => {
  transition('show-dialog-transition', () => {
    dialogContainer.classList.remove('hidden');  
  });
});

document.querySelector('.close-dialog').addEventListener('click', () => {
  transition('hide-dialog-transition', () => {
    dialogContainer.classList.add('hidden');  
  });
});

async function transition(className, callback) {
  if (!document.startViewTransition) {
    callback();
    return;
  }
  
  document.documentElement.classList.add(className);
  
  try {
    const transition = document.startViewTransition(callback);
    await transition.finished;  
  } finally {
    document.documentElement.classList.remove(className);
  }
}