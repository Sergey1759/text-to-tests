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
router.post('/', function(req, res, next) { 
  api.createUser(req.body)
  	.then(async function(result){ 
    let classs = await group.get(req.body.group);
    let students = classs.students;
    students.push((result._id).toString());
    await group.updateStudents(req.body.group,students);
    res.redirect('/')
  	})
  	.catch(function(err){
   if (err){
   //  res.status(500).send("This email already exist");
   res.redirect('/');
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