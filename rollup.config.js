import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/MultimediaObject.js',
  format: 'iife',
  moduleName: 'MultimediaObject',
  dest: 'build/MultimediaObject.build.js',
  plugins: [
    babel(),
    uglify(),
  ],
};
