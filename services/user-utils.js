const crypto = require('crypto');
const { passwordHash } = require('../config/index');

const createHashedPassword = password => 
crypto.createHmac('sha256', passwordHash)
.update(password)
.digest('hex')

const generateRandomPassword = (length = 12) => {
    const buffer = crypto.randomBytes(Math.ceil(length / 2));
    const password = buffer.toString('hex').slice(0, length);
    return password;
  }

module.exports = {createHashedPassword, generateRandomPassword};