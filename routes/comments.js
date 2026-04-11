const express = require('express');
const router = express.Router();

const bookComment = require('../models/comment'); 

router.post('/upsert', async (req, res, next) => {
  const {bookId} = req.body;
  the below if statement checks to see if the user is logged in
  if (!req.session.currentUser){
    req.session.flash = {
      type: 'danger',
      intro: 'Please log in.',
      message: 'You can\'t comment until you\'ve logged in to BookedIn!'
    }
    return res.redirect(303, '/users/login');
  }
  req.body.userEmail = req.session.currentUser.email;
  bookComment.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `Your comment has been ${createdOrupdated}!`,
  };
  res.redirect(303, `/books/show/${bookId}`);
});

router.get('/edit', async (req, res, next) => {
  let commentIndex = req.query.id;
  let comment = bookComment.get(commentIndex);
//the below if statements check to see if the user is logged in
//and if they're the correct user to be editing the comment
  if (!req.session.currentUser){
    req.session.flash = {
      type: 'danger',
      intro: 'Please log in.',
      message: 'You can\'t comment until you\'ve logged in to BookedIn!'
    }
    return res.redirect(303, '/users/login');
  }  
  if (req.session.currentUser.email !== comment.userEmail){
    req.session.flash = {
      type: 'danger',
      intro: 'Whoops',
      message: 'You\'re unable to edit other users\' comments.'
    }
    return res.redirect(303, '/books');
  }
  res.render('comments/form', { title: 'BookedIn || Edit Comment', comment, commentIndex});
});

module.exports = router;