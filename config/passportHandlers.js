const {createHashedPassword} = require('../services/user-utils');
const User = require('../models/User');
module.exports = {
    localStrategyHandler: async (username, password, done) => {
      try{
        let hashPass = createHashedPassword(password)
        let user = await User.findOne({email:username});
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        let pass = user.password
        if(pass == hashPass){
          return done(null, user); //(success)
        }else{
          return done(null, false, { message: 'Incorrect password.' });
        }
      }catch(err){
        return done(err); //(failure)
      }
    },
    googleStrategyHandler: async (accessToken, refreshToken, profile, done) => {
      try{
        let hashPass = createHashedPassword(profile.displayName)
        const existingUser = await User.findOne({ email: profile.emails[0].value });
        console.log(existingUser)
        if (existingUser) {
          // User is already registered, return the user
          return done(null, existingUser);
        }
        console.log(profile);
        const newUser = new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          password: hashPass,
          avatarImage: profile.photos[0].value,
        });
        await newUser.save();
        // Return the newly created user
        
        return done(null, newUser);
      }catch (error) {
        console.error('Error authenticating via Google:', error);
        return done(error);
      }
    },
    facebookStrategyHandler: async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        // Check if the user is already registered in your database based on their Facebook ID
        const existingUser = await User.findOne({ email: profile.id });
        let hashPass = createHashedPassword(profile.displayName)
        if (existingUser) {
          // User is already registered, return the user
          return done(null, existingUser);
        }
        // User is not registered, create a new user record
        const newUser = new User({
          facebookId: profile.id,
          username: profile.displayName,
          displayName: profile.displayName,
          email: profile.id,
          password: hashPass
          // Add other user properties as needed
        });
        // Save the new user to the database
        await newUser.save();
        // Return the newly created user
        return done(null, newUser);
      } catch (error) {
        console.error('Error authenticating via Facebook:', error);
        return done(error);
      }
    },
    isValid: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.sendStatus(401);
    }
}