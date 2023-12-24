const Author = require('../models/Author');
const Contact = require('../models/Contact');
const Songs = require('../models/Songs');
const User = require('../models/User');

exports.get_stats = async (req, res) => {
  try{
    const authorsCount = (await Author.find()).length;
    const songCount = (await Songs.find()).length;
    const userCount = (await User.find()).length
    const contactCount = (await Contact.find()).length
    let stats = {
        authorsCount,
        songCount,
        userCount,
        contactCount
    }
    res.json(stats);
  }catch(err){
    throw new Error(err);
  }
};