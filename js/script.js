import { DragAndDrop } from '../js/DragAndDrop.js';

const seila = new DragAndDrop('#wrapper nav','#wrapper', 'button');
seila.menuButtons('.btn-menu');
seila.init();