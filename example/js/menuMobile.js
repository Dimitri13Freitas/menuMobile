export class MenuMobile {
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
    document.documentElement.addEventListener('pointerdown',this.startEvent);
  }
  transition(active) {
    this.wrapper.style.transition = active ? '.3s' : '';
  }
  removeEvents(active, move, end) {
    if(active) {
      document.documentElement.addEventListener(move,this.midleEvent);
      document.documentElement.addEventListener(end,this.endEvent);
    } else {
      document.documentElement.removeEventListener(move,this.midleEvent);
      document.documentElement.removeEventListener(end,this.endEvent);
    }
  }
  startEvent(e) {
    e.stopPropagation();
    if(e.target === this.wrapper) {
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
      this.removeEvents(true, this.moveEvent, this.upEvent);
    } else {
      if(e.target.offsetParent === document.body || e.target.offsetParent === null) {
        this.wrapper.style.left = `${this.navSize}px`;
      }
    }
  }
  midleEvent(e) {
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
  endEvent() {
    this.transition(true);
    if(this.values.position >= (this.navSize / 2)) this.wrapper.style.left = `${0}px`;
      else this.wrapper.style.left = `${this.navSize}px`;
    this.removeEvents(false, this.moveEvent, this.upEvent);    
  }
  menuButtons(btns) {
    const buttons = document.querySelectorAll(btns);
    buttons.forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.transition(true);
        if(e.target.offsetParent === this.wrapper) {
          this.wrapper.style.left = `${this.navSize}px`;
        } else {
          this.wrapper.style.left = `${0}px`;
        };
      })
    })
  }
}