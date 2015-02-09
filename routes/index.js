var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
