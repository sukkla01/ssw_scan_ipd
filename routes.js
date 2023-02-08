

const passport = require('passport')
const passportService = require('./service/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const users = require('./controllers/Users')
const test = require('./controllers/Test')


const DrugIPd = require('./controllers/DrugIPd')





module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send("<h1 style='text-align:center;margin-top:150px; '>fast stroke Api</h1>")
    })
    app.post('/signin', requireSignin, users.signin)



    //drug  scan ipd
    app.get('/get-drug-scan-ipd', DrugIPd.getDrugScanIpd)
    app.post('/update-drug-scan-ipd', DrugIPd.updateTypeId)
    app.get('/get-drug-scan-search/:txtsearch', DrugIPd.getDrugScanIpdSearch)




}
