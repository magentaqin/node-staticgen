const fs = require('fs-extra');
const path = require('path');
const template = require('./templates/index');

const mount = (innerHTML) => {
  const string = innerHTML.replace('\n', '');
  return `document.getElementById('app').innerHTML = '${string}';`
}

const compile = (filePath) => {
  const rootMarkdown = fs.readFileSync(filePath, 'utf8');
  const bodyContent = template.generatePage(rootMarkdown);
  const script = `${mount(bodyContent)}`;

  fs.writeFileSync(
    './src/app.js',
    script,
    'utf8'
  );
}

module.exports = {
  compile
};