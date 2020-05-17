const initializeWebSockets = (io) => {
  io.on('connection', (socket) => {
    socket.emit('news', {
      hello: 'world'
    })
    socket.on('message', (data) => io.emit('newMessage', data))
    socket.on('sendNotification', (data) => {
      console.log(data)
      io.emit('recieveNotification', data)
    })
  })
}

module.exports = initializeWebSockets
