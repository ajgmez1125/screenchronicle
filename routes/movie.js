var express = require('express');
var router = express.Router();
var Media = require('../models/media')


router.get('/:id', (req, res) => {
    Media.findOne({_id: req.params.id})
    .then((media) => {
        res.render('media', {media: media})
    })
    .catch((err) => {
        res.send('Could not find movie')
    })
});

module.exports = router;