var express = require('express');
var router = express.Router();
var Media = require('../models/media')
const passport = require('passport')

router.get('/', function(req, res, next) {
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

module.exports = router;