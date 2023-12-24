const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const config = require('../config');
const {createHashedPassword} = require('../services/user-utils.js');

exports.user_get_byId = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
};

exports.update_user_progress = async (req, res) => {
    const { progress } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.progress = progress;
    await user.save();
    console.log('****************');
    // console.log(req.user);
    console.log(user.progress)
    console.log('****************');
    res.json(user);
};

exports.update_user = async (req, res) => {
    const { username, password, imagUrl } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if(username){
      user.username = username;
    }
    if(password){
      user.password = createHashedPassword(password);
    }
    if(imagUrl){
      user.avatarImage = imagUrl;
    }
    await user.save();
    console.log(user);
    res.json(user);
};

exports.add_song_to_user_favorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Assuming that there are no same song
    let exist= user.favoriteSongs.filter((obj) =>{ 
      obj = JSON.parse(obj)
      return obj._id === req.body._id
    })
    if(exist.length===0){
      user.favoriteSongs.push(JSON.stringify(req.body));
      await user.save();
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};

exports.deleteFavoriteSong = async (req, res) => {
  const userId = req.user._id;
  const indexToDelete = parseInt(req.params.index); // The index to delete

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the index is within the valid range
    if (indexToDelete >= 0 && indexToDelete <= user.favoriteSongs.length) {
      user.favoriteSongs.splice(indexToDelete, 1);
      await user.save();
      return res.send(user)
    } else {
      return res.status(400).json({ message: 'Invalid index provided' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};



exports.register_a_new_user = async (req, res)=> {
  const user = new User(req.body);
  await user.save();
    res.json(user);
}