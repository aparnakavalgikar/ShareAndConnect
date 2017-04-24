/**
 * Created by makarandpuranik on 2/23/17.
 */

var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://share:connect@ds161169.mlab.com:61169/shareandconnect', ['items']);

// Get all items
router.get('/items', function (req, res, next) {
    db.items.find(function (err, items) {
        if(err){
            res.send(err);
        } else {
            res.json(items);
        }
    })
});


// Get single item
router.get('/item/:id', function (req, res, next) {
    db.items.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, item) {
        if(err){
            res.send(err);
        } else {
            res.json(item);
        }
    })
});

//Save Item
router.post('/item', function (req, res, next) {
    var item = req.body;

    if (!item.title){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.items.save(item, function (err, item) {
            if(err){
                res.send(err);
            } else {
                res.json(item);
            }
        });
    }
});

//Update Item
router.put('/item/:id', function (req, res, next) {
    var item = req.body;
    var updateItem = {};

    if (item.title){
        updateItem.title = item.title;
    }

    if (item.isAvailable){
        updateItem.isAvailable = item.isAvailable;
    }

    if (!updateItem){
        res.status(400);
        res.json({
            "err": "Bad Data"
        });
    } else {
        db.items.update({_id: mongojs.ObjectId(req.params.id)}, updateItem, function (err, item) {
            if(err){
                res.send(err);
            } else {
                res.json(item);
            }
        });
    }
});

//Delete Item
router.delete('/item/:id', function (req, res, next) {
    db.items.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, item) {
        if(err){
            res.send(err);
        } else {
            res.json(item);
        }
    })
});

module.exports = router;


