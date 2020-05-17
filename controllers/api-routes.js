const db = require('../models')
const router = require('express').Router()
const iplocate = require('node-iplocate')

const ip = async (req) => {
  const address =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  if (address && address.includes(',')) {
    return iplocate(address.split(',')[0].trim())
  }
  return iplocate(address)
}

const distance = (lat1, lon1, lat2, lon2, unit) => {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0
  } else {
    const radlat1 = Math.PI * lat1 / 180
    const radlat2 = Math.PI * lat2 / 180
    const theta = lon1 - lon2
    const radtheta = Math.PI * theta / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit === 'K') { dist = dist * 1.609344 }
    if (unit === 'N') { dist = dist * 0.8684 }
    return dist
  }
}

router.get('/volunteers', function (req, res) {
  db.Volunteer.findAll()
    .then(volunteer => res.status(200).json({ data: volunteer }))
    .catch(err => {
      console.log(err)
      res.status(500).json({ errors: [err] })
    })
})

router.post('/volunteers', async function (req, res) {
  const body = req.body
  let { longitude, latitude } = await ip(req)
  longitude = parseFloat(body.long || longitude || 0.00)
  latitude = parseFloat(body.lat || latitude || 0.00)
  console.log({ longitude, latitude, ...body })
  db.Volunteer.create({ longitude, latitude, ...body })
    .then(volunteer => res.status(201).json({ data: volunteer }))
    .catch(err => {
      console.log(err)
      res.status(500).json({ errors: [err] })
    })
})

router.post('/patients', async function (req, res) {
  const body = req.body
  let { longitude, latitude } = await ip(req)
  longitude = parseFloat(body.long || longitude || 0.00)
  latitude = parseFloat(body.lat || latitude || 0.00)
  db.Patient.create({ longitude, latitude, ...body })
    .then(patient => res.status(201).json({ data: patient }))
    .catch(err => {
      console.log(err)
      res.status(500).json({ errors: [err] })
    })
})

router.post('/volunteers/alert', async function (req, res) {
  const body = req.body
  let { longitude, latitude } = await ip(req)
  longitude = parseFloat(body.long || longitude || 0.00)
  latitude = parseFloat(body.lat || latitude || 0.00)
  db.Volunteer.findAll()
    .then(volunteers => {
      let minDistance = Infinity
      let userToSendNotification = null
      volunteers.forEach(volunteer => {
        const dist = distance(parseFloat(latitude || 0.00), parseFloat(longitude || 0.00), volunteer.latitude, volunteer.latitude, 'K')
        if (dist <= minDistance) userToSendNotification = volunteer
        minDistance = Math.min(minDistance, dist || 0)
      })
      res.send({ userToSendNotification })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errors: [err] })
    })
})

module.exports = router
