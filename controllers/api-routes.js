const db = require('../models')
const router = require('express').Router()

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

router.post('/patients', function (req, res) {
  db.Patient.create(req.body)
    .then(patient => res.status(201).json({ data: patient }))
    .catch(err => {
      console.log(err)
      res.status(500).json({ errors: [err] })
    })
})
module.exports = router
