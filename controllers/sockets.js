const initializeWebSockets = (io) => {
  io.on('connection', (socket) => {
    socket.emit('news', {
      hello: 'world'
    })
    socket.on('message', (data) => io.emit('newMessage', data))
  })
}

module.exports = initializeWebSockets
