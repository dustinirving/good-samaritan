const socket = window.io()

function geocodeLatLng (map, latlng) {
  const geocoder = new window.google.maps.Geocoder
  const infowindow = new google.maps.InfoWindow
  geocoder.geocode({ location: latlng }, function (results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(16)
        var marker = new window.google.maps.Marker({
          position: latlng,
          map: map
        })
        infowindow.setContent(results[0].formatted_address)
        infowindow.open(map, marker)
      } else {
        window.alert('No results found')
      }
    } else {
      window.alert('Geocoder failed due to: ' + status)
    }
  })
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
        geocodeLatLng(map, latLng)
      }
    }
    console.log(data)
  })
}

document.addEventListener('DOMContentLoaded', entryPoint)
