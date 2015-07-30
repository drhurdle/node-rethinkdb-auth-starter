module.exports = function(req, res, next) {
  
  var userId = req.body.id;
  var currentUserId = req.token.id;

  if (userId != currentUserId) {
    return res.json(403, {err: 'You are not allowed to do that'});
  }

  next();
};