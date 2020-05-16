const newVolunteer = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  address: '',
  phoneNumber: '',
  drugsUsed: ''
}

fetch('/api/volunteers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newVolunteer)
})
  .then(response => response.json())
  .then(({ data }) => console.log(data).catch(console.log))
