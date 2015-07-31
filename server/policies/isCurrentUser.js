module.exports = function(req, res, next) {
  
  var userId = req.params.id;
  var currentUserId = req.token.id;

  if (userId != currentUserId) {
    return res.json({Error : 'You are not allowed to do that'});
  }

  next();
};