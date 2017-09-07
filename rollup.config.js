import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

const babelConf = {
  presets: [
    [
      'es2015',
      {
        modules: false,
      },
    ],
  ],
  plugins: [
    'external-helpers',
  ],
  babelrc: false,
};

export default {
  entry: 'src/MultimediaObject.js',
  format: 'iife',
  moduleName: 'MultimediaObject',
  dest: 'build/MultimediaObject.build.js',
  plugins: [
    resolve(),
    babel(babelConf),
    uglify(),
  ],
};