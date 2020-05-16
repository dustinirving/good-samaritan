const initializeWebSockets = (io) => {
  io.on('connection', (socket) => {
    // socket.emit('news', {
    //   hello: 'world'
    // })
    // socket.on('my other event', (data) => {
    //   console.log(data)
    // })
    console.log('socket connection established')
  })
}

module.exports = initializeWebSockets
