const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

//user related routes

router.get('/', userController.home);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

//Profile related
router.get(
  '/profile/:username',
  userController.ifUserExists,
  userController.profilePostsScreen
);

// Post related routes
router.get(
  '/create-post',
  userController.mustBeLoggedin,
  postController.viewCreateScreen
);

router.post(
  '/create-post',
  userController.mustBeLoggedin,
  postController.create
);

router.get('/post/:id', postController.viewSingle);
module.exports = router;

router.get(
  '/post/:id/edit',
  userController.mustBeLoggedin,
  postController.viewEditScreen
);

router.post(
  '/post/:id/edit',
  userController.mustBeLoggedin,
  postController.edit
);

router.post(
  '/post/:id/delete',
  userController.mustBeLoggedin,
  postController.delete
);
router.post('/search', postController.search);

module.exports = router;
