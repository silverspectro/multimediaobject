const EventManager = function () {
  this.listeners = {};
};
// place properties here
// Constructor
EventManager.prototype = {
    // public methods
  addListener(event, fn) {
    if (this.listeners[event]) {
      if (fn instanceof Function) {
        if (this.listeners[event].indexOf(fn) < 0) {
          this.listeners[event].push(fn);
        }
      }
    } else {
      this.listeners[event] = [];
      this.addListener(event, fn);
    }
    return this;
  },
  dispatchEvent(event, params, context) {
    params = params || {};

    if (this.listeners[event]) {
      if (context) {
        this.listeners[event].forEach((f, index) => {
          f.call(context, params);
        });
      } else {
        this.listeners[event].forEach((f, index) => {
          f.call(window, params);
        });
      }
    }
    return this;
  },
  removeListener(event, fn) {
    const fnIndex = this.listeners[event].indexOf(fn);
    if (fnIndex > 0) {
      this.listeners[event].splice(fnIndex, 1);
    }
    return this;
  },
};

const eventManager = new EventManager();
