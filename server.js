var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var userController = require('./server/controllers/userController');
var authController = require('./server/controllers/authController');
var isAuthorized   = require('./server/policies/isAuthorized');
var isCurrentUser  = require('./server/policies/isCurrentUser');


var port = process.env.PORT || 8000;
var router = express.Router();

app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header("Access-Control-Allow-Headers", "Content-Type");
       res.header("Access-Control-Allow-Methods", "DELETE, PUT");
       next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

router.use(function(req, res, next) {
	console.log('API is being used');
	next();
});

app.get('/', function(req, res){
	res.json({ message: 'The API is ready'});
});


router.route('/user').post(userController.register);
router.route('/user').get(userController.users);
router.route('/user/:id').get(userController.user);
router.route('/user/:id').put(isAuthorized, isCurrentUser, userController.editUser);
router.route('/user/:id').delete(isAuthorized, isCurrentUser, userController.deleteUser);

router.route('/login').post(authController.authenticate);


app.listen(port);
console.log("Server is listening on port " + port);