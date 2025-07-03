const express = require('express')

const app = express()

app.set('view engine', 'ejs')

// parses url encoded payload, i.e. data sent with Content-Type: application/x-www-form-urlencoded
// extended: false to use query training library
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    console.log(req.body)
})

app.listen(3000, () => console.log('Server started on port 3000'))
 