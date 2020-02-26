var express = require('express');
var router = express.Router();
var api = require('./apiUser')
var group = require('./apiGroup')


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
  let groupdate = await group.get(user.group);
  let classs = [];
  for (const id of groupdate.students) {
    if(id != req.session.user.id){
    let buf = await api.myfind(id);
    classs.push(buf);
    }
  }
  res.render('some', {user, classs});
 });

function midleware (req, res, next) {
  if(req.session.user){ next();
  } else {
    res.redirect('/');
  }
};

module.exports = router;
