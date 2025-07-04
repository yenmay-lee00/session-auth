const express = require('express')
const session = require('express-session')
const { checkLoggedIn, bypassLogin } = require('./middlewares')

const app = express()

app.set('view engine', 'ejs')

// parses url encoded payload, i.e. data sent with Content-Type: application/x-www-form-urlencoded
// extended: false to use query training library
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'my_session_secret',
    resave: true,
    saveUninitialized: false,
    name: 'yenmay', // name the cookie
    cookie: {
        maxAge: 10000 // 10s
    }
}))

// access ALL routes to send user details
app.use((req, res, next) => {
    res.locals.user = req.session.user
    next()
})

app.get('/', checkLoggedIn, (req, res) => {
    res.render('home')
})

// pass error variable to prevent error variable undefined ReferenceError
app.get('/login', bypassLogin, (req, res) => {
    res.render('login', { error:null })
})

app.post('/login', (req, res) => {
    // console.log(req.body)
    // simulate having a DB
    if (req.body.username === "beep" && req.body.password === "123") {
        // Create session and store user logged details, do not store sensitive info in the session e.g. password
        req.session.user = { id: 1, username: 'beep', name: 'beep' }
        // If credentials match then redirect user to home
        res.redirect('/')
    } else {
        // render the login.ejs view engine, pass error as value to that template
        res.render('login', {error: "Wrong credentials"})
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.clearCookie('yenmay')
    res.redirect('/')
})

app.listen(3000, () => console.log('Server started on port 3000'))
 