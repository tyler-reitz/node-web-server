const express = require('express')
const fs = require('fs')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  const now = new Date()
  const log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenanc.hbs')
// })

app.get('/', (req, res) => { 
  res.send({
    body: {
      username: 'tdreitz',
      password: 'foobar'
    }
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  })
})

app.listen(PORT, () => `listening on port ${PORT}`)