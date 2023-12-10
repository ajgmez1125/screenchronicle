var express = require('express');
var router = express.Router();
var Media = require('../models/media')
const User = require('../models/user')
const passport = require('passport')

router.get('/', function(req, res, next) {
  console.log(req.isAuthenticated())
  let mediaArr = []
  Media.find({})
  .then((media) => {
    mediaArr = media
    res.render('index', { title: 'ScreenChronicle', media: mediaArr});
  })
  .catch(() => {
    res.render('index', { title: 'ScreenChronicle', error: 'There was an error loading media'})
  })
});

router.get('/dashboard', (req,res) => {
  User.findById(req.user._id)
  .then((user) => {
    var context = {
      watched: [],
      watching: [],
      plantowatch: []
    }

    promises = []

    promises.push(Media.find({_id: {$in: user.watched}})
    .then((docs) => {
      console.log(docs)
      context.watched = docs
    }))

    promises.push(Media.find({_id: {$in: user.watching}})
    .then((docs) => {
      context.watching = docs
    }))

    promises.push(Media.find({_id: {$in: user.plantowatch}})
    .then((docs) => {
      context.plantowatch = docs
    }))

    Promise.all(promises)
    .then(() => {
      res.render('dashboard', context)
    })
  })
})

module.exports = router;