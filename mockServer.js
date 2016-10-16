const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/v1/messages', (req, res) => {
  res.sendFile(__dirname + '/fixtures/fakedata.json');
});

app.use(express.static(__dirname));


io.on('connection', (socket) => {
  socket.on('send:message', (msg) => {
    socket.broadcast.emit('broadcast:message', msg);
  });
});

http.listen(3005, () => {
  console.log('listening on *:3005');
});
