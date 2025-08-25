const pino = require('pino')();

const log = function log(...args) {
  if(args.length == 0) args = [''];

  for(const arg of args) {
    pino.info(arg);
  }
}

const error = function error(...args) {
  if(args.length == 0) args = [''];

  for(const arg of args) {
    pino.error(arg);
  }
}

module.exports = {log, error};