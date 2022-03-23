

const router = require('express').Router();

// user , post, comment  //      
const { User, Post, Comment } = require('../models');


// crud methods, get all notes, get a single post (uuid), create a note, comment on a note (patch), delete a note// 
// 

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('login');
});

router.get('/signUp', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('signUp');
});




module.exports = router; 