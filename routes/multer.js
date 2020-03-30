var multer = require('multer');
var path = require('path');
var fs = require('fs');
var apiTests = require('./apiTest');
var group = require('./apiGroup')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    let name = file.originalname;
    let k = name.replace('.txt', '')
    cb(null, k + '' + curentTime())
  }
})
var upload = multer({
  storage: storage
});

function curentTime() {
  var date = new Date();
  let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()} `;
  return str;
}
let midlle_for_multer = upload.single('test');

async function uploading(req) {
  let filedata = req.file;
  var contents = fs.readFileSync(filedata.path, 'utf8');
  console.log(contents);
  if (!filedata) {
    console.log("err")
  } else {
    console.log("uploadind is ok")
    let objects = getArray(contents);
    apiTests.createTest(req.body.test_name, objects).then(res => {
      group.insertNameTest(req.body.upload_test_groups, res._id);
    });
  }
};


function getArray(param) {
  var target = "-q-"; // цель поиска
  var questions = [];
  var pos = qPosition(param, target, -1);
  while (pos != -1) {
    questions.push(param.slice(pos, qPosition(param, target, pos)));
    pos = qPosition(param, target, pos);
  }
  var answ = [];
  var count_answer = 0;
  for (var i = 0; i < questions.length; i++) {
    pos = qPosition(questions[i], '-v-', -1);
    var t = qPosition(questions[i], '-t-', pos);
    answ[i] = {
      questions: '',
      answer: [],
      right: -1,
      id: i + 1000
    };
    answ[i].questions = questions[i].slice(0 + 3, qPosition(questions[i], '-v-', pos - 1));
    while (pos != -1) {
      answ[i].answer.push({
        answe: questions[i].slice(pos + 3, qPosition(questions[i], '-v-', pos)),
        id: count_answer++
      });
      pos = qPosition(questions[i], '-v-', pos);
    }
    for (var j = 0; j < answ[i].answer.length; j++) {
      var t = answ[i].answer[j].answe.indexOf('-t-');
      if (t != -1) {
        answ[i].answer[j].answe = answ[i].answer[j].answe.slice(t + 3);
        answ[i].right = answ[i].answer[j].id;
      }
    }
  }

  function qPosition(txt, target, prevPosition) {
    return txt.indexOf(target, prevPosition + 1);
  }
  return answ;
}

module.exports = {
  uploading,
  midlle_for_multer
}