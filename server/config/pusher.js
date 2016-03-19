var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '188152',
  key: 'f48cf388140d2c8b1d60',
  secret: '3c0ced462308d4196ce4',
  cluster: 'eu',
  encrypted: true
});

module.exports = pusher;
