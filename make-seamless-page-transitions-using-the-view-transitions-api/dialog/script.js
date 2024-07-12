const dialogButton = document.querySelector('.open-dialog');
const dialog = document.querySelector('.main-dialog');

dialogButton.addEventListener('click', (event) => {
  document.documentElement.classList.add('open-dialog-transition');
  
  const transition = document.startViewTransition(async () => {
    dialog.showModal();
  });
  
  transition.finished.finally(() => {
    document.documentElement.classList.remove('open-dialog-transition');
  });
});

dialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  transitionDialogClose(dialog);
});

dialog.addEventListener('submit', (event) => {
  if (event.target.method !== 'dialog') return;
  event.preventDefault();
  transitionDialogClose(dialog);
});

function transitionDialogClose(dialog) {
  document.documentElement.classList.add('close-dialog-transition');
  
  const transition = document.startViewTransition(() => {
    dialog.close();
  });
  
  transition.finished.finally(() => {
    document.documentElement.classList.remove('close-dialog-transition');
  });
}