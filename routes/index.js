var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    router.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    router.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    router.get('/chat', function(req, res) {
         res.render('chat', { title: 'Chat' } );
    });


/* Get Projects page */
router.get('/projects', function(req,res) {
   var db = req.db;
    var collection = db.get('projectcollection');
   collection.find({},{}, function(e,docs) {
    res.render('projects', {
	"projectlist": docs 
      }); 
    });
});
/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});
module.exports = router;
