var express = require('express')
var app 	= express()
var port 	= 3001

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var productRoute = require('./routes/product.route')
var requireLogin = require('./middleware/auth.middleware');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/express-demo');

app.listen(port,() => console.log('Server using port 3001 for ProjectJS app'))

app.set('view engine','pug')

app.set('views','./views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('481274hfuhwafjkaw'))
app.use(express.static('public'))

app.use('/users',requireLogin.authLogin ,userRoute)
app.use('/auth', authRoute)
app.use('/products', productRoute)


app.get('/',(req,res) => res.send("ProjectJS app"))


