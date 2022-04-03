

const router = require('express').Router();

// user , post, comment  //      
const { User, Post, Comment } = require('../../models');


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


router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('signUp');
});

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [User],
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('homepage', {
        posts
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router; 