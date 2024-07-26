const oldView = document.querySelector('.old-view');
const newView = document.querySelector('.new-view');

document.querySelector('.toggle').addEventListener('click', () => {
  transition(() => {
    oldView.classList.toggle('hidden');
    newView.classList.toggle('hidden');  
  });
});


async function transition(callback) {
  if (!document.startViewTransition) {
    callback();
    return;
  }
  
  document.startViewTransition(callback);
}