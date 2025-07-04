// Prevent logged in user to revisit login
exports.checkLoggedIn = (req, res, next) => {
    if (req.session.user) {  
        next()
    } else {
        // unlogged in user access login only
        res.redirect('/login')
    }
}

// Prevent bypass login
exports.bypassLogin = (req, res, next) => {
    if (!req.session.user) {  
        next()
    } else {
        // logged in users access home directly
        res.redirect('/')
    }
}