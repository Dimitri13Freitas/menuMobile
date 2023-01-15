export class DragAndDrop {
  constructor(nav, wrapper){
    this.wrapper = document.querySelector(wrapper);
    this.nav = document.querySelector(nav);
    this.navSize = -this.nav.getBoundingClientRect().width;
    this.values = {clickPosition: 0, position: 0,};
  }
  init() {
    this.wrapper.style.left = `${this.navSize - 1}px`;
    this.bind();
    this.addEvents();
  }
  bind() {
    this.startEvent = this.startEvent.bind(this);
    this.midleEvent = this.midleEvent.bind(this);
    this.endEvent = this.endEvent.bind(this);
  }
  addEvents() {
    this.wrapper.addEventListener('mousedown',this.startEvent);
    this.wrapper.addEventListener('touchstart',this.startEvent);
  }
  transition(active) {
    this.wrapper.style.transition = active ? '.3s' : '';
  }
  teste(active) {
    if(active) {
      document.documentElement.addEventListener('mousemove',this.midleEvent);
      document.documentElement.addEventListener('mouseup',this.endEvent);

      document.documentElement.addEventListener('touchmove',this.midleEvent);
      document.documentElement.addEventListener('touchend',this.endEvent);
    } else {
      document.documentElement.removeEventListener('mousemove',this.midleEvent);
      document.documentElement.removeEventListener('mouseup',this.endEvent);

      document.documentElement.removeEventListener('touchmove',this.midleEvent);
      document.documentElement.removeEventListener('touchend',this.endEvent);
    }
  }
  startEvent(e) {
    e.preventDefault();
    this.values.clickPosition = e.layerX;
    this.transition(false);
    this.teste(true);
  }
  midleEvent(e) {
    this.values.position = e.clientX - this.values.clickPosition;
    this.wrapper.style.left = `${this.values.position}px`;
    if(e.clientX > this.values.clickPosition) this.wrapper.style.left = `${0}px`;
    if(this.values.position < this.navSize) this.wrapper.style.left = `${this.navSize - 1}px`;
  }
  endEvent(e) {
    this.teste(false);
    this.transition(true);
    if(this.values.position < (this.navSize / 2)) this.wrapper.style.left = `${this.navSize - 1}px`;
    if(this.values.position > (this.navSize / 2)) this.wrapper.style.left = `${0}px`;
  }
  button(e) {

  }

}