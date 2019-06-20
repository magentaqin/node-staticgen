const md = require('markdown-it')();

const defaultMeta = {
  lang: 'en',
  title: 'Homepage',
}

const generatePage = (content, meta = defaultMeta) => {
  return `<div><p>Suppose this is a nav bar</p></div>${md.render(content)}`;
}

module.exports = {
  generatePage,
  defaultMeta,
}