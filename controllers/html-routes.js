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
router.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/signup.html'))
})
router.get('/details', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/details.html'))
})
router.get('/registered', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/registered.html'))
})

module.exports = router
