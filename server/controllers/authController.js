var thinky = require('thinky')();
var r = thinky.r;
var User = require('../models/user');
var tokenAuth = require('../services/tokenAuth');

exports.authenticate = function(req, res) {

  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(422).json({message : 'Username and Password required'});
  }

  User.filter({username:username}).run().then(function(userArray){

    var user = userArray[0];

    if (!user) {
      return res.status(422).json({message : 'This username does not exist'});
    }

    User.comparePassword(password, user, function (err, valid){

      if (err) {
        return res.status(422).json({message : err});
      }

      if (!valid) {
        return res.status(422).json({message : 'The username or password is incorrect'});
      } else {
        res.json({
          user: user,
          token: tokenAuth.issue({id : user.id })
        });
      }
    });
  });
}