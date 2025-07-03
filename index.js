const express = require('express')

const app = express()

app.set('view engine', 'ejs')

// parses url encoded payload, i.e. data sent with Content-Type: application/x-www-form-urlencoded
// extended: false to use query training library
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('home')
})

// pass error variable to prevent error variable undefined ReferenceError
app.get('/login', (req, res) => {
    res.render('login', { error:null })
})

app.post('/login', (req, res) => {
    // console.log(req.body)
    // simulate having a DB
    if (req.body.username === "beep" && req.body.password === "123") {
        // create a session
    } else {
        // render the login.ejs view engine, pass error as value to that template
        res.render('login', {error: "Wrong credentials"})
    }
})

app.listen(3000, () => console.log('Server started on port 3000'))
 