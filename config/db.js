const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/Partitura';

mongoose.connect(mongoDB, {});

module.exports={
    mongoDB
}
