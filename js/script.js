import { DragAndDrop } from '../js/DragAndDrop.js';

const seila = new DragAndDrop('#wrapper nav','#wrapper', 'button');
seila.buttons('.btn-menu');
seila.init()


// document.documentElement.addEventListener('touchmove', (e) => console.log(e))