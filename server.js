// ****************************************************************************
// Server.js
// This file is the initial starting point for the Node/Express server.
// ****************************************************************************

// Dependencies
// =============================================================
const express = require('express')
const morgan = require('morgan')

// Requiring our models for syncing to the MySQL database
// Remember: This syntax imports the `db` object exported from the
// `./models/index.js` module.
const db = require('./models')

// Sets up the Express App
// =============================================================
const app = express()
const http = require('http')
const initSockets = require('./controllers/sockets')

const server = http.createServer(app)
const io = require('socket.io').listen(server)

initSockets(io)

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

// Allow Express to automatically serve static resource like the
// HTML, CSS and JavaScript for the frontend client application.
app.use(express.static('./public'))

// Routes
// =============================================================
app.use(require('./controllers/html-routes.js'))
app.use('/api', require('./controllers/api-routes.js'))

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(() => {
  const PORT = process.env.PORT || 3000
  server.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})
