import { MenuMobile } from '../js/menuMobile.js';

const menu = new MenuMobile('#wrapper nav','#wrapper');
menu.menuButtons('.btn');
menu.init();

const btn = document.querySelector('#sexo');

btn.addEventListener('click', (e) => {
  console.log('ativou')
})
