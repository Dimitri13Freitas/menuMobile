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
    this.mouseLeave = this.mouseLeave.bind(this);
  }
  addEvents() {
    this.wrapper.addEventListener('mousedown',this.startEvent);
    this.wrapper.addEventListener('mouseup',this.endEvent);
    this.wrapper.addEventListener('mouseleave',this.mouseLeave);
  }
  transition(active) {
    this.wrapper.style.transition = active ? '.3s' : '';
  }
  startEvent(e) {
    e.preventDefault()
    this.values.clickPosition = e.layerX;
    e.preventDefault();
    this.wrapper.addEventListener('mousemove',this.midleEvent);
    this.transition(false);
  }
  midleEvent(e) {
    this.values.position = e.clientX - this.values.clickPosition;
    this.wrapper.style.left = `${this.values.position}px`;
    if(e.clientX > this.values.clickPosition) this.wrapper.style.left = `${0}px`;
    if(this.values.position < this.navSize) this.wrapper.style.left = `${this.navSize - 1}px`;
  }
  endEvent() {
    this.transition(true);
    this.wrapper.removeEventListener('mousemove',this.midleEvent);
    if(this.values.position < (this.navSize / 2)) this.wrapper.style.left = `${this.navSize - 1}px`;
    if(this.values.position > (this.navSize / 2)) this.wrapper.style.left = `${0}px`;
  }
  mouseLeave(e) {
    this.wrapper.removeEventListener('mousemove',this.midleEvent);
  }
}