document.addEventListener('DOMContentLoaded', () => {
  const socket = window.io()

  document.querySelector('#helpBtn').addEventListener('click', function () {
    function locator() {
      console.log('11')
      function executor(resolve, reject) {
        return window.navigator.geolocation.getCurrentPosition(
          position => {
            console.log('tets')
            resolve(position)
          },
          err => {
            if (err) reject(err)
          }
        )
      }

      return new Promise(executor)
    }

    socket.on('recieveNotification', (data) => {
      const user = localStorage.getItem('user')
      if (user && data.userToSendNotification) {
        console.log(data)
      }
    })

    locator().then(data => {
      fetch('/api/volunteers/alert/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lat: data.coords.latitude,
          long: data.coords.longitude
        })
      }).then(response => response.json()).then(res => socket.emit('sendNotification', res))
    })
  })
})