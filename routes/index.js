var express = require('express');
var router = express.Router();
var api = require('./apiUser')


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
  var data = {
  title: 'Express',
  user : req.session.user
  }
  res.redirect('some')
  // res.render('index', data);
  } else {
  var data = {
      title: 'Express',
  }
  res.render('index', data);
  }
  // console.log(req.session)
 });

 router.get('/some',midleware, async function(req, res, next) {
  let user = await api.myfind(req.session.user.id);
  console.log(user)
  res.render('some', user);
 });

function midleware (req, res, next) {
  if(req.session.user){ next();
  } else {
    res.redirect('/');
  }
};

module.exports = router;
