const path = require('path')
const router = require('express').Router()
// Routes
// =============================================================
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/landing.html'))
})

router.get('/help', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/help.html'))
})

router.get('/volunteer-signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/volunteer-signup.html'))
})
router.get('/patient-signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/patient-signup.html'))
})

router.get('/details', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/details.html'))
})
router.get('/registered-patient', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/registered-patient.html'))
})
router.get('/registered-volunteer', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/registered-volunteer.html'))
})

router.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/chat.html'))
})

module.exports = router
