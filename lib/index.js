const hotClient = require('webpack-hot-client');
const middleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const express = require('express');
const chokidar = require('chokidar');

// compile root markdown file
const docCompiler = require('./docCompiler');
docCompiler.compile('./test/pages/homepage.md');

// watch markdown files
const watcher = chokidar.watch('./test/pages', {
  ignored: /node_modules|\.git/,
});

watcher.on('all', () => {
  docCompiler.compile('./test/pages/homepage.md');
})

const config = require('../webpack.config');
const compiler = webpack(config);

// Specify websocket listening port. Important!
const options = {
  port: 8001,
}
const client = hotClient(compiler, options);

const app = express();
const { publicPath } = config.output;
const devMiddleware = middleware(compiler, { publicPath });
app.use(devMiddleware);

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is listening on ${port} port.`)
});