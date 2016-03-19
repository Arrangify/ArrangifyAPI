var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('events');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/', function(req, res) {
    var db = req.db;
    var collection = db.get('events');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
