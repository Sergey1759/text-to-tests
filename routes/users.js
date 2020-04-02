var express = require('express');
var router = express.Router();
var api = require('./apiUser')
var group = require('./apiGroup')

/* Создание пользователя */
router.post('/login', function (req, res, next) {
  if (req.session.user) return res.redirect('/');
  console.log('-/----//-/-/-/-/-')
  api.checkUser(req.body)
    .then(function (user) {
      if (user) {
        req.session.user = {
          id: user._id,
          name: user.name,
          group: user.group
        }
        res.redirect('/')
      } else {
        res.redirect('/')
      }
    })
    .catch(function (error) {
      res.send({
        answer: "неверный логин или пароль"
      })
      // return next(error)
    })

});
router.post('/', async function (req, res, next) { //async
  api.createUser(req.body)
    .then(async function (result) { //async
      if (result) {
        console.log(result);
        let groupdate = await group.get(req.body.group);
        if (groupdate) {
          console.log('group is')
          group.addStudent(result._id, req.body.group);
        }
        res.redirect('/')
      } else {
        res.send({
          m: 's'
        });
      }
    })
    .catch(function (err) {
      if (err) {
        console.log(err);
        //  res.status(500).send("This email already exist")
      }
      console.log(err)
    })
});

router.post('/logout', function (req, res, next) {
  if (req.session.user) {
    delete req.session.user;
    res.redirect('/')
  }
});

module.exports = router;