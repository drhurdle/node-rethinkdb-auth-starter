var thinky = require('thinky')();
var r = thinky.r;
var User = require('../models/user');
var tokenAuth = require('../services/tokenAuth');

exports.authenticate = function(req, res) {

  var username = req.param('username');
  var password = req.param('password');

  if (!username || !password) {
    return res.json({Message : "Username and Password required"});
  }

  User.filter({username:username}).run().then(function(userArray){

    var user = userArray[0];

    if (!user) {
      return res.json({Message : "The username is incorrect"});
    }

    User.comparePassword(password, user, function (err, valid){

      if (err) {
        return res.json({Message : err});
      }

      if (!valid) {
        return res.json({Message : "The username or password is incorrect"});
      } else {
        res.json({
          user: user,
          token: tokenAuth.issue({id : user.id })
        });
      }
    });
  });
}