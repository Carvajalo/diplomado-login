const express = require('express');
const config = require('./config.js');
const cors = require('cors');
const morgan = require('morgan');
const sessionRoutes = require('./routes/session.routes.js')
const multer = require('multer');


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

/* Implemented form-data requests */
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use('/', upload.none());
app.use('/api/auth', sessionRoutes);
app.use('/api/users', require('./routes/user.routes.js'));

app.get('/', (_, res) => {
  res.json({
    message: 'Welcome to my API'
  });
});


app.set('port', config.PORT);

module.exports = app;