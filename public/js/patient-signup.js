const form = document.getElementById('signup-form')

form.addEventListener('submit', event => {
  event.preventDefault()
  const firstName = document.getElementById('first-name')
  const lastName = document.getElementById('last-name')
  const address = document.getElementById('address')
  const drugUser = document.getElementById('drug-user')
  const emergencyContact = document.getElementById('emergency-contact')
  const email = document.getElementById('email')
  const password = document.getElementById('password')

  const newPatient = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    address: address.value.trim(),
    emergencyPersonName: drugUser.value.trim(),
    emergencyContact: emergencyContact.value.trim(),
    email: email.value.trim(),
    password: password.value.trim()
  }

  if (
    newPatient.firstName === '' ||
    newPatient.lastName === '' ||
    newPatient.address === '' ||
    newPatient.emergencyPersonName === '' ||
    newPatient.emergencyContact === '' ||
    newPatient.email === '' ||
    newPatient.password === ''
  ) {
    firstName.value = ''
    lastName.value = ''
    address.value = ''
    drugUser.value = ''
    emergencyContact.value = ''
    email.value = ''
    password.value = ''
    alert('You must fill in all of the fields.')
    return
  }
  fetch('/api/patients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPatient)
  })
    .then(response => response.json())
    .then(({ data }) => console.log(data))
    .then((window.location.href = 'registered-patient.html'))
    .catch(err => console.log(err))
})
