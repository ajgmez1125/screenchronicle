var express = require('express');
var router = express.Router();
var Media = require('../models/media')
var mongoose = require('mongoose')
var User = require('../models/user');
const user = require('../models/user');


router.get('/:id', (req, res) => {
    Media.findOne({_id: req.params.id})
    .then((media) => {
        let status = null
        if(req.isAuthenticated())
        {
            if(req.user.watched.includes(req.params.id))
            {
                status = 'watched'
            }
            else if(req.user.watching.includes(req.params.id))
            {
                status = 'watching'
            }
            else if(req.user.plantowatch.includes(req.params.id))
            {
                status = 'plantowatch'
            }
        }
        res.render('media', {media: media, status: status})
    })
    .catch((err) => {
        res.send(err.message)
    })
});

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
                    if(!user[progress].includes(req.params.id))
                    {
                        if(progress !== 'watched' && user['watched'].includes(req.params.id))
                        {
                            let newArr = user['watched']
                            newArr = user['watched'].filter((movie) => {
                                return !movie._id.equals(req.params.id)
                            })
                            user['watched'] = newArr
                        }

                        if(progress !== 'watching' && user['watching'].includes(req.params.id))
                        {
                            let newArr = user['watching']
                            newArr = user['watching'].filter((movie) => {
                                return !movie._id.equals(req.params.id)
                            })
                            user['watching'] = newArr
                        }

                        if(progress !== 'plantowatch' && user['plantowatch'].includes(req.params.id))
                        {
                            let newArr = user['plantowatch']
                            newArr = user['plantowatch'].filter((movie) => {
                                return !movie._id.equals(req.params.id)
                            })
                            user['plantowatch'] = newArr
                        }
                        user[progress] = [...user[progress], movie] 
                        user.save()
                        res.redirect(`/media/${req.params.id}`)
                    }
                    else
                    {
                        res.send(movie.title + ` has already been added to ` + progress)
                    }
                    
                })
                .catch((err) => {
                    res.send(err.message)
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

router.get('/:id/remove/', (req,res) => {
    if(req.isAuthenticated())
    {
        User.findById(req.user._id)
        .then((user) => {
            Media.findById(req.params.id)
            .then((movie) => {
                if(user['watched'].includes(req.params.id))
                {
                    let newArr = user['watched']
                    newArr = user['watched'].filter((movie) => {
                        return !movie._id.equals(req.params.id)
                    })
                    user['watched'] = newArr
                }

                if(user['watching'].includes(req.params.id))
                {
                    let newArr = user['watching']
                    newArr = user['watching'].filter((movie) => {
                        return !movie._id.equals(req.params.id)
                    })
                    user['watching'] = newArr
                }

                if(user['plantowatch'].includes(req.params.id))
                {
                    let newArr = user['plantowatch']
                    newArr = user['plantowatch'].filter((movie) => {
                        return !movie._id.equals(req.params.id)
                    })
                    user['plantowatch'] = newArr
                }
                user.save()
                res.redirect(`/media/${req.params.id}`)
            })
            .catch((err) => {
                res.send(err.message)
            })
        })
        .catch((err) => {
            res.send(err.message)
        })
    }
    else
    {
        res.send('You are not logged in')
    }
})

module.exports = router;