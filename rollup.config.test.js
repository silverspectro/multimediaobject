import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/MultimediaObject.js',
  format: 'iife',
  moduleName: 'MultimediaObject',
  dest: 'build/MultimediaObject.js',
  plugins: [babel()],
};
