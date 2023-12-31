var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')


var indexRouter = require('./routes/homepage');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var movieRouter = require('./routes/movie')
var logoutRouter = require('./routes/logout')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

let uri = "mongodb+srv://dbUser2217:DbUserPassword2217@cluster0.oqrz1xd.mongodb.net/"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('Error connecting to database')
})

db.once('open', () => {
  console.log('Connected')
})

app.use((req,res,next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/media', movieRouter);
app.use('/logout', logoutRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const Media = require('./models/media')
const media = require('./media.json')

//This adds all the stuff from the media.json file into the actual database
// Media.find({})
// .then((movies) => {
//   if(movies.length == 0)
//   {
//     media.movies.forEach((movie) => {
//       let media = new Media({
//         title: movie.title,
//         poster: movie.poster,
//         genres: movie.genres,
//         release_date: movie.release_date,
//         directors: movie.directors,
//         description: movie.description,
//         rating: movie.rating,
//         total_seasons: movie.total_seasons,
//         total_episodes: movie.total_episodes
//       })
//       media.save()
//     })    
//   }
// })


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = app;
