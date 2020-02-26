var express = require('express');
var router = express.Router();
var api = require('./apiUser')
var group = require('./apiGroup')
 
/* Создание пользователя */
router.post('/login', function(req, res, next) {
 if (req.session.user) return res.redirect('/')
 
 api.checkUser(req.body)
 .then(function(user){
 if(user){
 req.session.user = {id: user._id, name: user.name}
 res.redirect('/')
 } else {
 return next(error)
 }
 })
 .catch(function(error){
 return next(error)
 })
 
});
router.post('/', async function(req, res, next) { 
  api.createUser(req.body)
  	.then(async function(result){ 
    res.redirect('/')
  	})
  	.catch(function(err){
   if (err.toJSON().code == 11000){
   res.status(500).send("This email already exist")
   } 
   console.log(err)
  	})
});
 
router.post('/logout', function(req, res, next) {
 if (req.session.user) {
 delete req.session.user;
 res.redirect('/')
 }
});
 
module.exports = router;