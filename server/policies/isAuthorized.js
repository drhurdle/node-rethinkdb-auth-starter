var tokenAuth = require ('../services/tokenAuth');

module.exports = function (req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {

    var parts = req.headers.authorization.split(' ');

    if (parts.length == 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }

    } else {
      return res.json({err: 'Format is Authorization: Bearer [token]'});
    }

  } else {
    return res.json({err: 'No Authorization header was found'});
  }

  tokenAuth.verify(token, function (err, token) {
    if (err) return res.json({err: 'Invalid Token!'});
    req.token = token; 
    next();
  });
};