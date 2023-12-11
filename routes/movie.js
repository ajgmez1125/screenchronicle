var express = require('express');
var router = express.Router();
var Media = require('../models/media')
var mongoose = require('mongoose')
var User = require('../models/user')
var Review = require('../models/review')


router.get('/:id', (req, res) => {
    Media.findOne({_id: req.params.id})
    .then((media) => {
        res.render('media', {media: media, reviews: media.reviews});

        Review.find({mediaId: mediaId })
            .then((reviews)=>{
                res.render('media',{media:media,reviews:reviews});
            })
            .catch((err)=>{
                res.send('broke');
            })
    })
    .catch((err) => {
        res.send('Could not find movie')
    })
});


router.post('/:id/addReview', (req,res)=>{
    if(req.isAuthenticated()){
        const userId = req.user._id;
        const mediaId = req.params.id;
        const { reviewString, rating } = req.body;

        const newReview = new Review({
            user: userId,
            reviewString: reviewString,
            rating: rating,
            mediaId: mediaId
        });

        newReview.save()
            .then((review)=>{
                Media.findByIdAndUpdate(mediaId, {$push: {reviews:review._id}})
                    .then(()=>{
                        res.redirect(`/media/${mediaId}`);
                    })
                    .catch((err)=>{
                        res.send('Error associating review with media');
                    });
            })
            .catch((err)=>{
                res.send('Error saving Review');
            });
    }else{
        res.send('You are not logged in');
    }
})

router.get('/:id/add/:progress', (req,res) => {
    if(req.isAuthenticated())
    {
        User.findById(req.user._id)
        .then((user) => {
            if(user[req.params.progress.toLowerCase()] !== null)
            {
                progress = req.params.progress.toLowerCase()
                Media.findById(req.params.id)
                .then((movie) => {
                    user[progress] = [...user[progress], movie] 
                    user.save()
                    res.send('Success')
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                    res.send('Could not get movie')
                })
            }
        })
        .catch(() => {
            res.send('Could not find user')
        })
    }
    else
    {
        res.send('You are not logged in')
    }
})

router.get('/:id/remove/:progress', () => {

})

module.exports = router;