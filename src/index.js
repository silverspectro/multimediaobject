import configuration from './config/config';
import check from './libs/check';
import uuid from './libs/uuid';
import unserializeFunction from './libs/unserializeFunction';
import parseBooleans from './libs/parseBooleans';

import constructorSchema from './schemas/constructor';


export default class MultimediaObject {
  constructor(config = {}) {
    check.validate(config, constructorSchema);

    this.uuid = config.uuid || uuid();
    this.name = config.name || `multimediaobject-${this.uuid}`;
    this.type = 'block';
    
    this.data = {};

    this.style = {};
    this._style = {};
    this.attributes = {};
    this.events = {};
    this._events = {};
    this.functions = {};
    this.animations = {};
    this.breakpoints = [];
    this.dependencies = [];

    this.selectedAnimation = 'default';
    this.currentAnimation = {};
    this.animated = false;
    this.computedAnimations = [];
    this.childs = [];
    this.animatedProps = {};
    this.innerHTML = '';

    this.DOMParent = null;
    this.DOMParentUUID = null;

    this.reverse = false;
    this.repeat = 0;

    this.load = config.load || false;

    this.loadFromJSON(config);
  }

  /**
  * Set the absoluteAssetURL of the object
  * @param {object} json - the json representation of a MultimediaObject
  */

  setAbsoluteAssetURL() {
    if (window[configuration.globalNamespace]) {
      if (!this.data.template && window[configuration.namespace]) {
        if (typeof window[configuration.namespace].absoluteAssetURL !== 'undefined' && window[configuration.namespace].absoluteAssetURL !== 'undefined' && window[configuration.namespace].absoluteAssetURL !== '') {
          this.data.absoluteAssetURL = window[configuration.namespace].absoluteAssetURL;
        }
      } else {
        this.data.absoluteAssetURL = this.data.templateURL;
      }
    } else if (!window[configuration.globalNamespace] && window[configuration.namespace]) {
      if (typeof window[configuration.namespace].absoluteAssetURL !== 'undefined' && window[configuration.namespace].absoluteAssetURL !== 'undefined' && window[configuration.namespace].absoluteAssetURL !== '') {
        this.data.absoluteAssetURL = window[configuration.namespace].absoluteAssetURL;
      } else {
        this.data.absoluteAssetURL = this.data.absoluteAssetURL || './';
      }
    }
  }

  /**
  * load a JSON representation of a MultimediaObject
  * @param {object} json - a json representation of a MultimediaObject
  */

  loadFromJSON(json) {
    this.uuid = json.uuid || this.uuid || uuid();

    for (const key in json) {
      if (key === 'animations' && !json.animations.default) {
        this.currentAnimation = json.animations;
        this.animations.default = json.animations;
      } else if (key !== 'childs' && key !== 'events' && key !== 'functions') {
        if (json[key]) this[key] = json[key];
      }
    }

    for (const evt in json.exportedEvents) {
      this.events[evt] = unserializeFunction(json.exportedEvents[evt]);
    }

    for (const func in json.exportedFunctions) {
      this.functions[func] = unserializeFunction(json.exportedFunctions[func]);
    }
    if (json.childs) {
      json.childs.forEach((child, index) => {
        child.load = true;
        child.DOMParent = this;
        child.DOMParentUUID = this.uuid;
        this.childs.push(new MultimediaObject(child));
      });
    }

    this.DOMParentUUID = json.DOMParentUUID || null;
    this.selectedAnimation = json.selectedAnimation || this.selectedAnimation;
    this.repeat = parseInt(json.repeat, 10) || 0;
    this.data.autostart = this.data.autostart ? parseBoolean(json.data.autostart) : true;
    this.data.forceStart = this.data.forceStart ? parseBoolean(json.data.forceStart) : false;
    // convert Booleans to Booleans 
    Object.keys(this.data).forEach((key) => {
      if (this.data[key] === 'false' || this.data[key] === 'true') this.data[key] = parseBoolean(this.data[key]);
    });
    this.setAbsoluteAssetURL();
  }
}