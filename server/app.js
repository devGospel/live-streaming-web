const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const userRoutes = require('./routes/users/user.route')
require('dotenv').config();


const store = MongoStore.create({
  mongoUrl: 'mongodb://127.0.0.1:27017/LIVE-STREAMING_DB',
  collection: "mySessions",
});


app.use(session({ 
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store, 
})); 

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET","POST"],
  credentials: true
}))

app.use(cookieParser())


// CONNECT TO DATABASE

mongoose.connect('mongodb://127.0.0.1:27017/LIVE-STREAMING_DB')
  .then(()=>{
  console.log('Database Connection is ready...')
  })
  .catch((err)=> {
  console.log(err);
  })


app.use('/api/users', userRoutes)

  const PORT = 2001;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})