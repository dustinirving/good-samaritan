const socket = window.io('http://localhost:3000')

const entryPoint = () => {
  socket.on('connect', () => console.log('socket connected!'))
  socket.on('recieveNotification', (data) => {
    // const user = localStorage.getItem('user')
    alert(JSON.stringify(data))
    console.log(data)
  })
}

document.addEventListener('DOMContentLoaded', entryPoint)
