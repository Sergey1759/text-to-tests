var express = require('express');
var router = express.Router();
var api = require('./apiUser')
var group = require('./apiGroup')

/* Создание пользователя */
router.post('/login', function (req, res, next) {
  if (req.session.user) return res.redirect('/');
  console.log(req.body);
  api.checkUser(req.body)
    .then(function (user) {
      if (user) {
        req.session.user = {
          id: user._id,
          name: user.name,
          group: user.group
        }
        console.log(1);

        res.redirect('/')
      } else {
        console.log(2);

        res.redirect('/')
      }
    })
    .catch(function (error) {
      console.log(3);
      res.status(200).json({
        answer: "неверный логин или пароль"
      });
      // return next(error)
    })

});
router.post('/', async function (req, res, next) { //async'
  api.createUser(req.body)
    .then(async function (result) { //async
      if (result) {
        console.log(result);
        let groupdate = await group.get(req.body.group);
        if (groupdate) {
          console.log('group is')
          group.addStudent(result._id, req.body.group);
        }
        res.json({
          answer_True: "Регистрация выполнена успешно теперь выполните вход..."
        })
      } else {
        console.log('sdas11');
        res.redirect('/');
      }
    })
    .catch(function (err) {
      console.log('mail is not s');
      res.json({
        answer_False: "этот Email уже используется"
      })
    })
});

router.post('/logout', function (req, res, next) {
  if (req.session.user) {
    delete req.session.user;
    res.redirect('/')
  }
});

module.exports = router;