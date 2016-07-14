var thinky    = require('thinky');
var r         = thinky.r;
var type      = thinky.type;
var User      = require('../models/user');
var tokenAuth = require('../services/tokenAuth');


exports.register = function(req , res){

	if(!req.body.username){return res.status(422).json({message : 'Username is Required'});}
	if(!req.body.password){return res.status(422).json({message : 'Password is Required'});}

	User.filter({username:req.body.username}).run().then(function(userArray){
		if(userArray[0]){return res.status(422).json({message : 'Username is in use'});}
  

		var user = new User(req.body);

		user.save().then(function(result) {
			res.json({
				user: user,
				token: tokenAuth.issue({id: user.id})
				});
		}).error(function(err){
			res.status(404).json({message : 'An Error has Occured'});
	 	});
	});
};


exports.users = function(req , res){

	var user = User.run().then(function(result){
		res.status(200).json(result);
	}).error(function(err){
		res.status(404).json({message : 'An Error has Occured'});
 	});
};


exports.user = function(req , res){

	var id = req.params.id;
	User.get(id).run().then(function(result){
		res.status(200).json(result);
	}).error(function(err){
		res.status(404).json({message : 'User Not Found'});
 	});
};

exports.deleteUser = function(req , res){

	var id = req.params.id;
	User.get(id).delete().run().then(function(error , result){
		res.status(200).json({message: 'User Deleted'});
	});
};
