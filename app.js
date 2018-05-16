const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');


const users = require('./routes/users');
const questions = require('./routes/questions');


const app = express();
const port = 3000;
const config = require('./config/database');


//connecting to the database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
    console.log("connect to the database" + config.database);
});

//on error
mongoose.connection.on('error', () => {
    console.log("database error" + error);
});

//using cors 
app.use(cors());
app.use(bodyParser.json());


//passport middleware 
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//using routs
app.use('/users', users);
app.use('/questions', questions);

app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});


app.listen(port, () => {
    console.log('server up')
});