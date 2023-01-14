export class DragAndDrop {
  constructor(nav, wrapper, btnMenu){
    this.wrapper = document.querySelector(wrapper);
    this.nav = document.querySelector(nav);
    this.navSize = -this.nav.getBoundingClientRect().width;
    this.values = {clickPosition: 0, position: 0,};
    this.btnMenu = btnMenu ? document.querySelector(btnMenu) : null;
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
  teste(active) {
    if(active) {
      document.documentElement.addEventListener('mousemove',this.midleEvent);
      document.documentElement.addEventListener('mouseup',this.endEvent);
    } else {
      document.documentElement.removeEventListener('mousemove',this.midleEvent);
      document.documentElement.removeEventListener('mouseup',this.endEvent);
    }
  }
  startEvent(e) {
    e.preventDefault()
    this.values.clickPosition = e.layerX;
    e.preventDefault();
    this.wrapper.addEventListener('mousemove',this.midleEvent);
    this.transition(false);
    this.teste(true);
  }
  midleEvent(e) {
    this.values.position = e.clientX - this.values.clickPosition;
    this.wrapper.style.left = `${this.values.position}px`;
    if(e.clientX > this.values.clickPosition) this.wrapper.style.left = `${0}px`;
    if(this.values.position < this.navSize) this.wrapper.style.left = `${this.navSize - 1}px`;
  }
  endEvent() {
    console.log(this.values.position)
    console.log(this.navSize)
    this.teste(false);
    this.transition(true);
    this.wrapper.removeEventListener('mousemove',this.midleEvent);
    if(this.values.position < (this.navSize / 2)) this.wrapper.style.left = `${this.navSize - 1}px`;
    if(this.values.position > (this.navSize / 2)) {
      // console.log(this.values.position)
      // console.log(this.navSize / 2)
      this.wrapper.style.left = `${0}px`;
    };
  }
  mouseLeave(e) {
    // this.wrapper.removeEventListener('mousemove',this.midleEvent);
  }
}