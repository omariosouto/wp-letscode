"use strict";

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.command('generate <projectName>').alias('g').description('Gerar uma nova estrutura de projeto WordPress').action(function (projectName) {
  return console.log('alo');
});

_commander.default.parse(process.argv);