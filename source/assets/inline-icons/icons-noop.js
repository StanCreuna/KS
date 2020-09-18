// NOTE: When running tests, importing SVGs directly will make the application crash. This file exports a noop for each svg file
const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(name => name.endsWith('.svg'));

export default files.reduce(
  (accum, name) => ({ ...accum, [name.replace('.svg', '')]: () => null }),
  {}
);
