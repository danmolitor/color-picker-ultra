import path from 'path';
import express from 'express';
import http from 'http';
// import mongoose from 'mongoose';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// mongoose.Promise = global.Promise;
import config from '../webpack.config.js';
import { isDev, port } from './config/envDefaults';

// mongoose.connect(mongodbURI);

/* ===============================================
   DB Event Handlers
   ===============================================
 */

/*
 // logs a connection
 mongoose.connection.on('connected', () => {
   console.log('Mongoose connected to ' + mongodbURI);
 });

 // logs when disconnected
 mongoose.connection.on('disconnected',  () => {
   console.log('Mongoose disconnected');
 });

 // logs when user terminates app
 process.on('SIGINT',  () => {
   mongoose.connection.close( () => {
     console.log('Mongoose disconnected through app termination');
     setTimeout( () => {
      process.exit(0);
     }, 300);
   });
 });

 */

const app = express();
const server = http.createServer(app)

// referenced https://github.com/christianalfoni/webpack-express-boilerplate
if (isDev) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  });
} else {
  app.use('/assets', express.static('dist'));

  // This redirects any GET requests that aren't for '/' or our above-mentioned
  // routes to the home-page, letting the router on our SPA front-end handle it.
  // This way, trying to refresh a specific page of the app won't
  // end in a "cannot GET '/part/of/app'" error
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

server.listen(port, () => console.log(`App Listening on port ${port}`));
