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
    this.wrapper.addEventListener('pointerdown',this.startEvent);
  }
  transition(active) {
    this.wrapper.style.transition = active ? '.3s' : '';
  }
  teste(active, move, end) {
    if(active) {
      document.documentElement.addEventListener(move,this.midleEvent);
      document.documentElement.addEventListener(end,this.endEvent);
    } else {
      document.documentElement.removeEventListener(move,this.midleEvent);
      document.documentElement.removeEventListener(end,this.endEvent);
    }
  }
  startEvent(e) {
    if(e.pointerType === 'mouse') {
      this.values.clickPosition = e.layerX;
      this.moveEvent = 'mousemove';
      this.upEvent = 'mouseup';
    } else {
      this.values.clickPosition = e.layerX;
      this.moveEvent = 'touchmove';
      this.upEvent = 'touchend';
    }
    this.transition(false);
    this.teste(true, this.moveEvent, this.upEvent);
  }
  midleEvent(e) {
    if(e.type === 'mousemove') {
      e.preventDefault();
      this.values.position = e.clientX - this.values.clickPosition;
      this.wrapper.style.left = `${this.values.position}px`;
      if(e.clientX > this.values.clickPosition) this.wrapper.style.left = `${0}px`;
    } else {      
      this.values.position = e.changedTouches[0].clientX - this.values.clickPosition;
      this.wrapper.style.left = `${this.values.position}px`;
      if(e.changedTouches[0].clientX > this.values.clickPosition) this.wrapper.style.left = `${0}px`;
    }
    if(this.values.position < this.navSize) this.wrapper.style.left = `${this.navSize - 1}px`;
  }
  endEvent(e) {
    this.teste(false, this.moveEvent, this.upEvent);
    this.transition(true);
    if(this.values.position < (this.navSize / 2)) this.wrapper.style.left = `${this.navSize - 1}px`;
    if(this.values.position > (this.navSize / 2)) this.wrapper.style.left = `${0}px`;
  }
  button(e) {
    
  }

}