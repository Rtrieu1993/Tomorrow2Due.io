// filepath: /Users/adrianahernandez/Tomorrow2Due.io/backend/generateSecret.js
const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);