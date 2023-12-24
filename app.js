const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const db = mongoose.connection;

const { dbConfig, cookieConfig, sessionSecret } = require('./config/index');

const passport = require('passport');

const authRouter = require('./routes/authRouter')
const authorRouter = require('./routes/authorRouter');
const songsRouter = require('./routes/songsRouter');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const contactRouter = require('./routes/contactRouter');
const PORT = 3030;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoDBStore(dbConfig),
    cookie: cookieConfig
}));


app.use(passport.initialize());
app.use(passport.session());


//run app after mongo up
db.once('open', function() {
    console.log('Connected!');
    app.listen(PORT, () => {
        console.log('Server is up and running on port numner ' + PORT);
    });
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Attach custom passport configuration
require('./config/strategies');


app.use(express.static('public'));

//auth router
app.use('/auth', authRouter);

//author router
app.use('/authors', authorRouter);

//songs router
app.use('/songs', songsRouter);

//contact router
app.use('/contact', contactRouter);

//user router
app.use('/user', userRouter);
//user router
app.use('/admin', adminRouter);

app.get('/isLogIn',(req, res)=>{
    if(req.isAuthenticated()){
      res.send(req.user)
    }else{
      res.send(false)
    }
})