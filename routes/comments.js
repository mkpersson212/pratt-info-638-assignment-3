const express = require('express');
const router = express.Router();

const BookUser = require('../models/book_user');
const bookComment = require('../models/comment');


router.post('/upsert', async (req, res) => {
  const { bookId, text } = JSON.stringify(req.body); //this 
  await Comment.create({ bookId, userEmail: req.user._id, text });
  res.redirect(`/books/${bookId}`);
});


router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  bookComment.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `Your comment has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books/$book.Id');
});

module.exports = router;