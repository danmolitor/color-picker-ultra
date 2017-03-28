// From: https://github.com/reactjs/redux/blob/master/examples/real-world/containers/Root.js

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}
