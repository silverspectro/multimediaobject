import check from 'Lib/check';

import { constructorSchema } from 'Schemas/constructor';


class MultimediaObject {
  constructor(config) {
    check.validate(config, constructorSchema);

    this.name = config.name;
    this.data = config.data;
  }
}