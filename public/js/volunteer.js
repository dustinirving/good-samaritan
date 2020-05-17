const socket = window.io()

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null)
  } else {
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
  }
}

const entryPoint = () => {
  socket.on('connect', () => console.log('socket connected!'))
  socket.on('recieveNotification', (data) => {
    const message = document.querySelector('#alertText')
    message.innerText = 'Your help was just requested '
    if (data && data.context) {
      if (window && window.google && window.google.maps) {
        const ctx = data.context
        const latLng = { lat: ctx.lat, lng: ctx.long }
        const map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: latLng
        })
        const marker = new window.google.maps.Marker({
          position: latLng,
          map: map,
          draggable: true,
          animation: window.google.maps.Animation.DROP,
          title: 'Hello World!'
        })
        marker.addListener('click', () => toggleBounce(marker))
        marker.setMap(map)
      }
    }
    console.log(data)
    alert(JSON.stringify(data))
    console.log(data)
  })
}

document.addEventListener('DOMContentLoaded', entryPoint)
