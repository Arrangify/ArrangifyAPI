var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/me', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* Create user. */
router.post('/', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
