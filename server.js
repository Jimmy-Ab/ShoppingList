require('.//routes/api/passportCofing');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const cookieParser = require('cookie-parser');



const app = express();



//bodyParser middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

items(app);
users(app);

const db = require('./config/keys').mongoURI;
mongoose
  .connect('mongodb://localhost:27017/Shopping-List', {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected '))
  .catch(err => console.log(err));


  const port = process.env.PORT || 8080;

  app.listen(port, () => console.log(`server running on port ` + port));
