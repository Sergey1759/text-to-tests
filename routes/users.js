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
        console.log('sdas11');
        res.redirect('/');
      }
    })
    .catch(function (err) {
      console.log('mail is not s');
      res.redirect('/');
    })
});

router.post('/logout', function (req, res, next) {
  if (req.session.user) {
    delete req.session.user;
    res.redirect('/')
  }
});

module.exports = router;