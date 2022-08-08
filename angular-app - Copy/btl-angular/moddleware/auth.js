const sestion = require('node-sessionstorage')

module.exports = function(req, res, next) {
    let check = sestion.getItem('admin_login') ? true : false
    if(check) {
        next()
    } else { 
        res.redirect('/login')
    }
}