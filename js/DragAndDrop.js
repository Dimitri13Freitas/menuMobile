export class DragAndDrop {
  constructor(nav, wrapper){
    this.wrapper = document.querySelector(wrapper);
    this.nav = document.querySelector(nav);
    this.navSize = -this.nav.getBoundingClientRect().width - 1;
    this.values = {clickPosition: 0, position: 0};
  }
  init() {
    this.wrapper.style.left = `${this.navSize}px`;
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
    e.stopPropagation();
    e.preventDefault();
    let clientType;
    if(e.type === 'mousemove') {
      clientType = e.clientX;
      this.values.position = clientType - this.values.clickPosition;
      this.wrapper.style.left = `${this.values.position}px`;
    } else {
      clientType = e.changedTouches[0].clientX;
      this.values.position = clientType - this.values.clickPosition;
      this.wrapper.style.left = `${this.values.position}px`;
    }
    if(clientType > this.values.clickPosition) this.wrapper.style.left = `${0}px`;
    if(this.values.position < this.navSize) this.wrapper.style.left = `${this.navSize}px`;
  }
  endEvent(e) {
    e.stopPropagation();
    this.transition(true);
    if(this.values.position >= (this.navSize / 2)) this.wrapper.style.left = `${0}px`;
    if(this.values.position <= (this.navSize / 2)) this.wrapper.style.left = `${this.navSize}px`;
    this.teste(false, this.moveEvent, this.upEvent);
    // console.log(this.values.position)
  }
  buttons(btns) {
    const buttons = document.querySelectorAll(btns);
    // console.log(this.wrapper.style)
    buttons.forEach(e => {
      e.addEventListener('click', () => {
        this.transition(true);
        if(this.wrapper.style.left === '0px') {
          this.wrapper.style.left = `${this.navSize}px`;
        } else {
          this.wrapper.style.left = `${0}px`;
        }
      })
    })
  }

}