import check from './libs/check';

import constructorSchema from './schemas/constructor';


export default class MultimediaObject {
  constructor(config) {
    check.validate(config, constructorSchema);

    this.name = config.name;
    this.data = config.data;
  }
}