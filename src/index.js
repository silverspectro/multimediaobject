import configuration from './config/config';
import check from './libs/check';
import parseBooleans from './libs/microutils/src/lang/parseBooleans';
import uuid from './libs/microutils/src/lang/uuid';
import unserialize from './libs/microutils/src/functions/unserialize';

import constructorSchema from './schemas/constructor';
import driverSchema from './schemas/driver';

const defaultNameRegExp = new RegExp(/multimediaObject(\d+)?/);

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
    this.breakpoints = [];
    this.dependencies = [];
    this.childs = [];

    this.loadFromJSON(config);

    // this.init();
  }

  /**
   * find Driver by id
   * 
   * @param {string} id 
   * @param {boolean} [index=true] 
   * 
   * @memberOf MultimediaObject
   * @return {Driver|Number}
   */
  findDriver(id, index = true) {
    this.data.drivers = this.data.drivers || [];
    return index ?
    this.data.drivers.findIndex(d => d.id === id)
    : this.data.drivers.find(d => d.id === id);
  }

  /**
   * load a Driver into the MultimediaObject
   * this driver gets is own personnal space into the data.drivers namespace
   * 
   * @memberOf MultimediaObject
   * @param {[Driver]} driver - a Driver configuration
   * @return {MultimediaObject} this
   */
  loadDrivers(drivers) {
    check.check(drivers, Array);
    drivers.forEach(driver => this.addDriver(driver));
  }

  /**
   * add a Driver to the MultimediaObject if it does not exist
   * create a personnal space fot he driver to access
   * 
   * @param {Driver} driver - a driver configuration 
   * 
   * @memberOf MultimediaObject
   */
  addDriver(driver) {
    check.validate(driver, driverSchema);
    const index = this.findDriver(driver.id);
    if (index === -1) {
      this.data.drivers.push(driver);
      this.data.drivers[driver.id] = this.data.drivers[driver.id] || {};
    } else {
      console.error(`Driver ${driver.name || driver.id} is loaded`);
    }
  }
  
  /**
   * remove a Driver driver from a MultimediaObject
   * deletes his data space
   * 
   * @param {Driver} driver 
   * 
   * @memberOf MultimediaObject
   */
  removeDriver(driver) {
    check.validate(driver, driverSchema);
    const index = this.findDriver(driver.id);
    if (index >= 0) {
      this.data.drivers.splice(index, 1);
      delete this.data.drivers[driver.id];
    } else {
      console.error(`Driver ${driver.name || driver.id} does not exist`);
    }
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
    for (const key in json) {
     if (key !== 'childs' && key !== 'events' && key !== 'functions') {
        if (json[key]) this[key] = json[key];
      }
    }

    for (const evt in json.exportedEvents) {
      this.events[evt] = unserialize(json.exportedEvents[evt]);
    }

    for (const func in json.exportedFunctions) {
      this.functions[func] = unserialize(json.exportedFunctions[func]);
    }

    if (json.childs) {
      json.childs.forEach((child, index) => {
        child.load = true;
        this.childs.push(new MultimediaObject(child));
      });
    }
    // convert Booleans to Booleans 
    Object.keys(this.data).forEach((key) => {
      if (this.data[key] === 'false' || this.data[key] === 'true') this.data[key] = parseBooleans(this.data[key]);
    });
    this.setAbsoluteAssetURL();
  }
}