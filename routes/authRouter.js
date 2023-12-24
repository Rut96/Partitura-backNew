const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer');

const User = require('../models/User');

const { createHashedPassword, generateRandomPassword } = require('../services/user-utils');

router.post('/loginLocal', 
  passport.authenticate('local', {
      failureRedirect: '/',
  }), (req, res)=>{
    console.log('***************')
    console.log(req.user)
    console.log('***************')
    res.send(req.user);
  }
);
// router.post('/loginLocal', (req, res, done) => {
//   // passport.authenticate('local', )
//   try{
//     let { email, password } = req.body;
//     console.log(email)
//     console.log(password)
//   }catch(err){
//     console.log(err);
//   }
// }
// );

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }), (req, res)=>{
    res.send(200);
  }
);

router.get('/google/callback',
  passport.authenticate('google', {
    // successRedirect: '/profile',
    failureRedirect: '/',
  }), (req, res)=>{
    // console.log(req);
    res.redirect('http://localhost:3000/profile');
  }
);

router.get('/facebook', passport.authenticate('facebook'));
  
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/',
  }), (req, res)=>{
    // console.log(req);
    res.redirect('http://localhost:3000/profile');
  }
);

router.get('/logout', (req, res)=>{
  req.logOut(passport.LogOutOptions, (err) => {
    console.log(err)
  });
  res.redirect('/')
});

router.post('/forgotPassword', async (req, res) => {
  const { email } = req.body;

  try {
    // Search for the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let pass = generateRandomPassword(12);
    let hachPass = createHashedPassword(pass);
    user.password = hachPass;
    await user.save()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'partitura042@gmail.com',
        pass: '248163264128q',
      },
    });

    const mailOptions = {
      from: 'partitura042@gmail.com',
      to: email,
      subject: 'Partitura message',
      text: pass,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ success: true, message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Profile route
router.get('/profile',  async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id);
  res.send(user);
});

module.exports = router;