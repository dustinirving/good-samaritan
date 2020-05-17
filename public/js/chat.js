const socket = window.io()
const userMessages = {}

let wasPreviousIn = false

const registerSocket = () => {
//   socket.on('news', (data) => {
//     console.log(data)
//     socket.emit('my other event', { my: 'data' })
//   })
  socket.on('newMessage', (data) => addChatMessage(data))
}

const chatMessage = ({ message, name }) => {
  userMessages.previous = message
  return `<li class="${wasPreviousIn ? 'out' : 'in'}">
    <div class="chat-img" bis_skin_checked="1">
        <img alt="Avtar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcpx4GmgeGMY-_ZEtrm4rqX29S7SMDwwOYTA9kHPPNtziUeRLW&usqp=CAU">
    </div>
    <div class="chat-body" bis_skin_checked="1">
        <div class="chat-message" bis_skin_checked="1">
            <h5>${name}</h5>
            <p>${message}</p>
        </div>
    </div>
</li>`
}

const addChatMessage = ({ message, name }) => {
  const entry = document.querySelector('.chat-list')
  if (message !== userMessages.previous) {
    entry.innerHTML += chatMessage({ message, name })
    wasPreviousIn = !wasPreviousIn
  }
}

const handleChange = (e) => {
  const message = e.target.value
  if (e.key === 'Enter') {
    const context = {
      name: 'Jesse',
      message
    }
    addChatMessage(context)
    socket.emit('message', context)
    e.target.value = ''
  }
}

const entryPoint = () => {
  const inputField = document.querySelector('#chatInput')
  inputField.addEventListener('keyup', handleChange)
  registerSocket()
}

document.addEventListener('DOMContentLoaded', entryPoint)
