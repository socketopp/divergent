var Formatter = require('njstrace/lib/formatter.js');

function CustomFormatter() {
}

require('util').inherits(CustomFormatter, Formatter);

CustomFormatter.prototype.onEntry = function (args) {
  process.stderr.write(JSON.stringify({ state: 'onEntry', name: args.name, file: args.file, line: args.line, length: args.args.length, stackLength: args.stack.length }) + ',');
  
};

CustomFormatter.prototype.onExit = function (args) {
  process.stderr.write(JSON.stringify({ state: 'onExit', name: args.name, file: args.file, line: args.line, exception: args.exception, retLine: args.retLine, span: args.span, hasRetValue: args.returnValue }) + ',');
};

module.exports = {
  CustomFormatter,
}