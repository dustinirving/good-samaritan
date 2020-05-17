const socket = window.io()

const entryPoint = () => {
  socket.on('recieveNotification', (data) => {
    const user = localStorage.getItem('user')
    if (user && data.userToSendNotification) {
      console.log(data)
    }
  })
}

document.addEventListener('DOMContentLoaded', entryPoint)
