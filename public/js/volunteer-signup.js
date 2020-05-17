const form = document.getElementById('signup-form')

form.addEventListener('submit', event => {
  event.preventDefault()
  const firstName = document.getElementById('first-name')
  const lastName = document.getElementById('last-name')
  const password = document.getElementById('password')
  const phoneNumber = document.getElementById('phone-number')
  const email = document.getElementById('email')

  const newVolunteer = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    password: password.value.trim(),
    phoneNumber: phoneNumber.value.trim(),
    email: email.value.trim()
  }

  if (
    newVolunteer.firstName === '' ||
    newVolunteer.lastName === '' ||
    newVolunteer.password === '' ||
    newVolunteer.phoneNumber === '' ||
    newVolunteer.email === ''
  ) {
    firstName.value = ''
    lastName.value = ''
    password.value = ''
    phoneNumber.value = ''
    email.value = ''
    alert('You must fill in all of the fields')
    return
  }

  fetch('/api/volunteers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newVolunteer)
  })
    .then(response => response.json())
    .then(({ data }) => localStorage.setItem('user', data))
    .then((window.location.href = 'registered-volunteer.html'))
    .catch(err => console.log(err))
})
