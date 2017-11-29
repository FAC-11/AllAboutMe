document.querySelectorAll('.hide-button').forEach( div => div.addEventListener('click', () => toggleClip(div)));

function toggleClip(div){
  const textareadiv = div.parentElement.querySelector('.hide-button ~ textarea');
  textareadiv.classList.toggle("clip");
  div.querySelector('button > #upbutton').classList.toggle("clip");
  div.querySelector('button > #downbutton').classList.toggle("clip");
}
