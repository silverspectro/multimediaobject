const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const prompt = require('prompt');

const NAMESPACE_MACRO = '{{ namespace }}';
const SCENE_MACRO = '{{ scene }}';

//
// Start the prompt
//
prompt.start();

const projectDirectory = path.resolve(__dirname, '../');
const srcFolder = path.resolve(projectDirectory, 'src');
const configFolder = path.resolve(srcFolder, 'config');

const error = err => console.error(chalk.bold.red('ERROR:', err));
const pendingMessage = messages => console.log(chalk.white(chalk.white.bgRed(' NOK '), ...messages));
const successMessage = messages => console.log(chalk.white(chalk.white.bgGreen(' OK '), ...messages));

const step1 = (callback) => {
  pendingMessage([chalk.blue(`copying ${configFolder}/config.tpl.js to config.js`)]);

  prompt.get({
    properties: {
      override: {
        description: 'Override config file ?',
        pattern: /y[es]*|n[o]?/,
        message: 'Must respond yes or no',
        default: 'no',
      },
    },
  }, (err, result) => {
    if (err) error(err);
    fs.copy(`${configFolder}/config.tpl.js`, `${configFolder}/config.js`, {
      overwrite: result.override !== 'no',
    }, (err2) => {
      if (err2) return error(err2);
      successMessage([chalk.green(`${configFolder}/config.js copied succesfully`)]);

      return callback();
    });
  });
};

const step2 = () => {
  pendingMessage([chalk.blue(`configuring ${configFolder}/config.js`)]);

  prompt.get({
    properties: {
      namespace: {
        description: 'What is your namespace variable name ?',
        message: 'namespace must be a word',
        pattern: /^\w+$/,
        default: 'test',
      },
      scene: {
        description: 'What is your scene name (DOM) ?',
        message: 'scene must be a word',
        pattern: /^\w+$/,
        default: 'scene',
      },
    },
  }, (err, result) => {
    if (err) error(err);
    fs.readFile(`${configFolder}/config.js`, { encoding: 'utf8' }, (error, data) => {
      const replacedData = data.replace(NAMESPACE_MACRO, result.namespace).replace(SCENE_MACRO, result.scene);
      fs.writeFile(`${configFolder}/config.js`, replacedData, { encoding: 'utf8' }, (err2) => {
        if (err2) error(err2);
        return successMessage([chalk.green(`${configFolder}/config.js succesfully configured with ${result.namespace} && ${result.container}`)]);
      });
    });
  });
};

console.log('======================== INSTALLING MO LIBRARY ========================');
step1(step2);
