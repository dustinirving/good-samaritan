document.querySelector('#helpBtn').addEventListener('click', function () {
  function locator () {
    function executor (resolve, reject) {
      return window.navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        err => { if (err) reject(err) }
      )
    }

    return new Promise(executor)
  }

  locator().then(data => {
    fetch('/api/volunteers/alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat: data.coords.latitude, long: data.coords.longitude })
    }).then(response => response.json()).then(res => console.log(res))
  })
})
