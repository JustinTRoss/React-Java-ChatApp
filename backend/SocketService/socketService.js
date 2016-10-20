const http = require('http').Server();
const io = require('socket.io')(http);
const PORT = 3005;

io.on('connection', (socket) => {
  socket.on('send:message', (msg) => {
    socket.broadcast.emit('broadcast:message', msg);
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
