const socket = window.io('http://localhost:3000')

let wasPreviousIn = false

const registerSocket = () => {
  socket.on('news', (data) => {
    console.log(data)
    socket.emit('my other event', { my: 'data' })
  })
}

const chatMessage = ({ message, name }) => {
  return `<li class="${wasPreviousIn ? 'out' : 'in'}">
    <div class="chat-img" bis_skin_checked="1">
        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar3.png">
    </div>
    <div class="chat-body" bis_skin_checked="1">
        <div class="chat-message" bis_skin_checked="1">
            <h5>${name}</h5>
            <p>${message}</p>
        </div>
    </div>
</li>`
}

const addChatMessage = (message) => {
  const entry = document.querySelector('.chat-list')
  socket.emit('my other event', { message })
  const context = {
    name: 'Jesse',
    message
  }
  entry.innerHTML += chatMessage(context)
  wasPreviousIn = !wasPreviousIn
}

const handleChange = (e) => {
  const message = e.target.value
  if (e.key === 'Enter') {
    addChatMessage(message)
    e.target.value = ''
  }
}

const entryPoint = () => {
  const inputField = document.querySelector('#chatInput')
  inputField.addEventListener('keyup', handleChange)
  registerSocket()
}

document.addEventListener('DOMContentLoaded', entryPoint)
