const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');

// configure .env
require('dotenv').config()

// cors
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();

// middlewares
app.use(credentials)        // always before cors
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index'))
app.use('/student', require('./routes/student'))
app.use('/teacher', require('./routes/teacher'))
app.use('/auth', require('./routes/handleAuth'))          // <-- TO handle refreshToken and logout
app.use('/admin', require('./routes/admin'))       // Restricted route (later)
app.use(verifyJWT)              // middleware: All routes after this line are jwt protected! 
app.use('/assessment', require('./routes/assessment'))    // <-- Problem route!
app.use('/subject', require('./routes/subject'))
app.use('/secret', require('./routes/protectedRoute'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ "message": err.message });
});

module.exports = app;
