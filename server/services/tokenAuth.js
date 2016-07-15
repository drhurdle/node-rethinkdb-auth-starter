var jwt = require('jsonwebtoken');

module.exports.issue = function(payload) {
  return jwt.sign(
    payload,
    process.env.TOKEN_SECRET || 'dontforgettochangethissecretvariable',
    { expiresIn : 180 }
    );
};

module.exports.verify = function(token, callback) {
  return jwt.verify(
    token,
    process.env.TOKEN_SECRET || 'dontforgettochangethissecretvariable',
    {},
    callback
  );
};