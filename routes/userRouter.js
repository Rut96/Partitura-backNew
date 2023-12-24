const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// GET /user/:id - get user by ID
router.get('/:id', async (req, res) => {
  try {
     userController.user_get_byId(req, res)
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /user/progress - update user progress
router.post('/progress', async (req, res) => {
  try {
    userController.update_user_progress(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/updateUser', async (req, res) => {
  try {
    userController.update_user(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /user/:id/favorites - add song to user favorites
router.post('/favorites', async (req, res) => {
  try {
    userController.add_song_to_user_favorites(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//DELETE /user/favorites/:id - DELETE song from user favorites
router.delete('/favorites/:index', async (req, res) => {
  try{
    userController.deleteFavoriteSong(req, res);
  }catch(err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /users/register - register a new user
router.post('/register', async (req, res) => {
  try {
    userController.register_a_new_user(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



module.exports = router;
