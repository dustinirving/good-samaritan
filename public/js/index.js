document.querySelector('#helpBtn').addEventListener('click', function () {
  function locator () {
    function executor (resolve, reject) {
      window.navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        err => reject(err)
      )
    }

    return new Promise(executor)
  }
  locator().then(data => {
    fetch('/api/patients', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat: data.coords.latitude, long: data.coords.longitude })
    }).then(response => {
      if (response.ok) location.reload()
    })
  })
})
