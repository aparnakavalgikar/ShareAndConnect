/**
 * Created by makarandpuranik on 2/28/17.
 */

var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/* Use in case of MLab
var db = mongojs('mongodb://share:connect@ds115870.mlab.com:15870/shareandconnect', ['users']);
 */

// Get all users
router.get('/users', function (req, res, next) {
    db.users.find(function (err, users) {
        if (err){
            res.send(err);
        } else {
            res.json(users);
        }
    });
});

// Get one user
router.get('/user/:id', function (req, res, next) {
    db.users.findOne({_id: mongojs.ObjectId(req.param.id)}, function (err, user) {
        if(err)
            res.send(err);
        else
            res.json(user)
    })
});

router.post('/login', function (req, res, next) {
  var user = req.body;

  if (!user.name || !user.password || !user.email || !user.zipcode) {
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.users.save(user, function (err, user) {
      if(err){
        res.send(err);
      } else {
        res.json(user);
        res.render('signin');
      }
    })
  }

});

// Save new user
router.post('/user', function (req, res, next) {
    console.log(req.body);

    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    User.addUser(newUser, function (err, user) {
      if (err) {
        res.status(400);
        res.json({success: false, msg: 'User registration failed'});
      } else {
        res.json({success: true, msg: 'User registered'});
        res.render('signin');
      }
    });
});


// Authenticate User
router.post('/authenticate', function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, function (err, user) {
    if (err) throw err;
    if (!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Update existing user
router.put('/user/:id', function (req, res, next) {
    var user = req.body;
    var updateuser = {};

    if (user.name) {
        updateuser.name = user.name;
    }

    if (user.password) {
        updateuser.password = user.password;
    }

    if (user.email) {
        updateuser.email = user.email;
    }

    if (user.zipcode) {
        updateuser.zipcode = user.zipcode;
    }

    if (user.address) {
        updateuser.address = user.address;
    }

    if (user.mobileno) {
        updateuser.mobileno = user.mobileno;
    }

    if (!updateuser) {
        res.status(400);
        res.json({
            "err": "Bad Data"
        });
    } else {
        db.users.update({_id: mongojs.ObjectId(req.param.id)}, function (err, user) {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        })
    }
});

// Delete user
router.delete('/user/:id', function (req, res, next) {
    db.users.remove({_id: mongojs.ObjectId(req.param.id)}, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    })
});

// Get Profile
router.get('/profile', passport.authenticate('jwt', {session:false}),
  function (req, res, next) {
  res.json({user: req.user});
});

module.exports = router;
