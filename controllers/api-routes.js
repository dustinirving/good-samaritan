const db = require('../models')
const router = require('express').Router()
const iplocate = require('node-iplocate')

router.get('/volunteers', function (req, res) {
  db.Volunteer.findAll()
    .then(volunteer => res.status(200).json({ data: volunteer }))
    .catch(err => {
      console.log(err)
      res.status(500).json({ errors: [err] })
    })
})

router.post('/volunteers', function (req, res) {
  db.Volunteer.create(req.body)
    .then(volunteer => res.status(201).json({ data: volunteer }))
    .catch(err => {
      console.log(err)
      res.status(500).json({ errors: [err] })
    })
})

router.post('/patients', async function (req, res) {
  async function ip (req) {
    const address = 
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);
    if (address && address.includes(",")) {
      return iplocate(address.split(",")[0].trim());
    }
    return await iplocate(address);
  }

  let body = req.body
  let {latitude, longitude} = await ip(req)

  db.Patient.create({...body, latitude, longitude})
    .then(patient => res.status(201).json({ data: patient }))
    .catch(err => {
      console.log(err)
      res.status(500).json({ errors: [err] })
    })
})
module.exports = router
