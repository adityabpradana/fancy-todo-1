if(process.env.NODE_ENV==='development' || !process.env.NODE_ENV){
    require('dotenv').config()
}

const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000

const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
    
// Check mongoose connection
mongoose.connect(`mongodb+srv://mongodb:${process.env.MONGODB_PASSWORD}@mongodb-9zz64.gcp.mongodb.net/todo?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connect to mongodb')
});

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(logger('dev'))

// Routes
app.use('/api', routes)

// Error Handler
app.use(errorHandler)

// module.exports = app

app.listen(port, ()=> console.log('Listening on port', port))