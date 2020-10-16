const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const authRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

dotenv.config()


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout' , 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: '10mb' , extended: false}))
app.use(methodOverride('_method'))

mongoose.connect(process.env.DB_CONNECT , { useNewUrlParser: true } , () => console.log('connected to DB'))


app.use('/' , indexRouter)
app.use('/authors' , authRouter)
app.use('/books' , bookRouter)

app.listen(process.env.PORT || 3000)
