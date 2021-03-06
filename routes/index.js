var express = require("express");
var router = express.Router();

var api = require("../api/ApiUser");
var group = require("../api/ApiGroup");
var multer_ = require("../service/multer");

var apiTest = require("../api/ApiTest");
var apiGroup = require("../api/ApiGroup");
var apiTestResult = require("../api/ApiTestResult");
var ApiMessage = require("../api/ApiMessage");
var ApiRooms = require("../api/ApiRooms");

var Mailer = require('../service/MailApi');

var ApiNewMessage = require('../api/ApiNewMessage');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/server')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

var upload = multer({
  storage: storage
})

router.get("/", async function (req, res, next) {
  let names_group = await apiGroup.getAllForAuth();
  req.session.user ? res.redirect("some") : res.render("index", {names_group});
});

router.get("/addGroup", midleware, isAdmin, async function (req, res, next) {
  res.render("addGroup");
});

router.post("/addGroup", midleware, isAdmin, async function (req, res, next) {
  await apiGroup.createGroup(req.body.name_group);
  res.redirect("/addGroup");
});

router.get("/some", midleware, async function (req, res, next) {
  let {classmates, user} = await getClassmates(req.session.user.id);
  classmates.err ? console.log(err) : res.render("some", {user, classmates});
});

router.get("/addTest", midleware, isAdmin, async function (req, res, next) {
  let allGroups = await group.getAll();
  console.log(allGroups)
  res.render("addTest", {allGroups});
});

async function midleware(req, res, next) {
  if (req.session.user) {
    await api.setOnline(req.session.user.id, new Date());
    next();
  } else {
    res.redirect("/");
  }
}

async function isAdmin(req, res, next) {
  let user = await api.getByID(req.session.user.id);
  if (user.role === "admin") {
    next();
  } else {
    res.redirect("/");
  }
}

router.get("/admin", midleware, isAdmin, async function (req, res, next) {
  res.render("admin");
});

router.get("/UsersControl", midleware, isAdmin, async function (req, res, next) {
  let all_users = await api.getAll();
  res.render("UsersControl", {all_users});
});

router.post("/upload", midleware, isAdmin, multer_.midlle_for_multer, async function (req, res, next) {
    multer_.uploading(req);
    res.redirect("/addTest");
  }
);

router.get("/my_tests", midleware, async function (req, res, next) {
  let {user ,MyTests} = await getAllTestsOfMyGroup(req.session);
  console.log(MyTests);
  res.render("my_tests", {MyTests, user});
});

router.get("/setting", midleware, async function (req, res, next) {
  let user = await api.getByID(req.session.user.id);
  res.render("setting", {user});
});

router.post("/setting/updateUserImg", midleware, upload.single("avatar"), async function (req, res, next) {
  try {
    if (req.file) {
      await api.updateImg(req.body.user_id, '/images/server/' + req.file.filename);
    } else {
      await api.updateImg(req.body.user_id, req.body.url);
    }
  } catch (err) {
    res.sendStatus(400);
  }
  res.sendStatus(200);
});

router.post("/setting/confirm", midleware, async function (req, res, next) {
  let session_user = req.session.user;
  let random_code = randomCode(10);
  let updated_user = await api.updateConfirmCode(session_user.id, random_code);
  try {
    if (req.body.isChangeEmail) {
      await Mailer.sendMail(req.body.email, random_code);
    } else {
      await Mailer.sendMail(updated_user.email, random_code);
    }
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(200)
});

router.post("/setting/update", midleware, async function (req, res, next) {
  let user = await api.getByID(req.session.user.id);
  let req_pass_to_hash = await api.hash(req.body.old_password);
  if (user.password == req_pass_to_hash && user.confirm_code == req.body.mail_code) {
    for (const iterator in req.body.change_data) {
      console.log(iterator)
      if (iterator == 'password') {
        let hash_new_password = await api.hash(req.body.change_data[iterator]);
        console.log(hash_new_password);
      } else {
        console.log(req.body.change_data[iterator]);
        await api.updateByIdFromFields(req.session.user.id, iterator, req.body.change_data[iterator]);
      }
    }
    res.send({
      ок: "всё успешно"
    });
  } else {
    res.send({
      err: "не правильный пароль либо код"
    });
  }
});

router.get("/my_tests/:name", midleware, async function (req, res, next) {
  let user = await api.getByID(req.session.user.id);
  let test = await apiTest.getByID(req.params.name);
  res.render("name", {
    test,
    user,
  });
});

router.post("/upload_test_result", midleware, async function (req, res, next) {
  let response_user_result = await api.getByIDandReturnResult(req.session.user.id);
  let response_Result = await apiTestResult.findUserResult(req.body.idTest, req.session.user.id);
  let response_checked_test = await apiTest.checkTests(req.body.idTest, req.body.arr);
  console.log(response_user_result);

  if (response_Result.length && response_Result[0] != undefined) {
    for (const obj of response_user_result) {
      if ("" + obj === "" + response_Result[0]._id) {
        let buf_arr = response_Result[0].arr;
        for (const elem_buf of buf_arr) {
          for (const elem_checked of response_checked_test) {
            if (elem_buf.id === elem_checked.id) {
              elem_buf.count += +elem_checked.value;
              elem_checked.isModified = true;
            }
          }
        }
        for (const elem_checked of response_checked_test) {
          if (!elem_checked.isModified)
            buf_arr.push({
              id: elem_checked.id,
              count: +elem_checked.value,
            });
        }
        console.log(buf_arr)
        // let req_for_attempt = await apiTestResult.insertIdRESULT(response_Result[0]._id, buf_arr);
        // req_for_attempt = req_for_attempt.attempt;
        // await apiTestResult.insertIdAttempt(response_Result[0]._id, ++req_for_attempt);

      } else {
        throw new Error(
          "in upload_test_result something is not working correctly"
        );
      }
    }
  } else { // якщо ще не проходив тест
    // перетворює масив обєктів з відповдями  { id: 1016, value: false } в число value 0
    let buf_arr = response_checked_test.map(elem => {
      return {
      id: elem.id,
        count: +elem.value,
      };
    });

    let isCreateResult = await apiTestResult.createUserResult( req.body.idTest, req.session.user.id, buf_arr);
    let buf_arr_ = [...response_user_result];
    buf_arr_.push(isCreateResult._id);
    await apiTestResult.insertIdAttempt(isCreateResult._id, 1);
    await api.insertIdRESULT(req.session.user.id, buf_arr_);
  }
  res.send({m: "hi"});
});

router.get("/chat", midleware, async function (req, res, next) {
  let user = await api.getByID(req.session.user.id);
  let user_chats_id = user.chats;
  let user_chats = await ApiRooms.getIncludes(user_chats_id);
  let arr = [];

  let obj_new_message = await ApiNewMessage.getObjectChatsId(req.session.user.id);
  console.log(obj_new_message);

  for (const iterator of user_chats) {
    let obj = {};
    if (iterator.type == "each other") {
      obj.chat_id = iterator._id;
      for (const users of iterator.users) {
        if ("" + users != "" + req.session.user.id) {
          let local_user = await api.getByID(users);
          obj.user_name = local_user.name;
          obj.lastname = local_user.lastname;
          obj.photo = local_user.photo;
          obj.chat_id = iterator._id;
          obj.new_message = obj_new_message[iterator._id] == undefined ? false : obj_new_message[iterator._id];
        }
      }
      arr.push(obj);
    } else if (iterator.type == "group") {
      obj.chat_id = iterator._id;
      obj.user_name = iterator.name;
      obj.photo = iterator.img;
      obj.new_message = obj_new_message[iterator._id] == undefined ? false : obj_new_message[iterator._id];
      arr.push(obj);
    }
  }
  console.log(arr);
  res.render("chat", {
    arr,
    user,
  });
});

router.get("/chat/:id", midleware, async function (req, res, next) {
  let userID = req.session.user.id;
  let RoomID = req.params.id;
  let chat = await ApiRooms.getById(RoomID);
  let chat_name = chat.name;
  let users_in_chat = await api.getIncludesID(...chat.users);
  let user = await api.getByID(userID);
  let massage = await ApiMessage.getChatByIdPagination(RoomID);
  let obj = {};
  let complete_arr = [];
  let user_img = user.photo;
  let another_user;
  await ApiNewMessage.reset(RoomID, userID);
  for (const iterator of massage) {
    if (obj[iterator.from] == undefined) {
      let user = await api.getByID(iterator.from);
      obj[iterator.from] = {
        photo: user.photo,
        name: user.name,
        lastname: user.lastname,
        online: dateFormat(user.online),
      };
    }
    if ("" + iterator.from == "" + req.session.user.id) {
      complete_arr.push(
        createData(
          iterator.message,
          "me",
          obj[iterator.from].photo,
          dateFormat(iterator.data)
        )
      );
    } else {
      complete_arr.push(
        createData(
          iterator.message,
          "li_reverse",
          obj[iterator.from].photo,
          dateFormat(iterator.data)
        )
      );
      if (chat.type == "each other") {
        another_user = obj[iterator.from];
        another_user.type = true;
      } else {
        another_user = {
          type: false,
          name: chat.name,
          photo: chat.img,
        };
      }
    }
  }

  function dateFormat(date) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var month = months[date.getMonth()];
    var dateDay = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    return `${month} ${dateDay} ${hour}:${min}`;
  }

  function createData(message, div_class, img, date, type_bool) {
    return {
      massage: message,
      div_class: div_class,
      img: img,
      date: date,
      type: type_bool,
    };
  }
  res.render("chat_id", {
    userID,
    RoomID,
    user_img,
    user,
    complete_arr,
    another_user,
    chat_name,
    users_in_chat,
  });
});

router.post(
  "/chat/update_img",
  midleware,
  upload.single("avatar"),
  async function (req, res, next) {
    // let m = await ApiRooms.updateChatImg();
    try {
      if (req.file) {
        await ApiRooms.updateChatImg(req.body.room, '/images/server/' + req.file.filename);
      } else {
        await ApiRooms.updateChatImg(req.body.room, req.body.url);
      }
    } catch (err) {
      res.sendStatus(400);
    }
    res.sendStatus(200);
  }
);

// router.get("/my_result", midleware, async function (req, res, next) {
//   let user = await api.getByID(req.session.user.id);
//   res.render("my_result", {
//     user,
//   });
// });

router.get("/classmates", midleware, async function (req, res, next) {
  let classs = [];
  let groupdate = await group.get(req.session.user.group);
  let user = await api.getByID(req.session.user.id);
  if (groupdate) {
    let obj = groupdate.students;
    for (const id of obj) {
      if (id != req.session.user.id && id != false) {
        let buf = await api.getByID(id);
        classs.push(buf);
      }
    }
  } else {
    console.log("error group is not created");
  }
  res.render("classmates", {
    classs,
    user,
  });
});

router.post("/classmates", midleware, async function (req, res, next) {
  // console.log(req.body.classmates_id);
  let classmates = await api.getByID(req.body.classmates_id);
  let room = await ApiRooms.getIncludesByIdUsers("" + req.session.user.id);
  console.log(room);
  if (false) {
    let new_room = await ApiRooms.createRooms(
      `${req.session.user.name}-${classmates.name}`,
      "each other",
      classmates._id,
      req.session.user.id
    );
    await api.addChatRooms(classmates._id, new_room._id);
    await api.addChatRooms(req.session.user.id, new_room._id);
  }
  // res.redirect("/chat");
});

function randomCode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// refactor functions !!!!!!!
async function getClassmates(userID){
  let user = await api.getByID(userID);
  let classmates = [];
  let group_data = await group.get(user.group);
  if (group_data) {
    let students = group_data.students;
    for (const id of students) {
      if (id != user.id && id != false) {
        let buf_data = await api.getByID(id);
        classmates.push(buf_data);
      }
    }
    return {user , classmates};
  } else {
    return {err : "error group is not created"};
  }
}

async function getAllTestsOfMyGroup(session){
  let user = await api.getByID(session.user.id);
  let my_group = await group.get(session.user.group);
  let TestsOfMyGroup = my_group.tests;
  let AllTests = await apiTest.getAll();
  let MyTests = [];
  for (let i = 0; i < TestsOfMyGroup.length; i++) {
    for (let j = 0; j < AllTests.length; j++) {
      if ("" + TestsOfMyGroup[i] == "" + AllTests[j]._id) {
        MyTests.push({
          id: "" + AllTests[j]._id,
          name: AllTests[j].name,
        });
      }
    }
  }
  return {user , MyTests}
}

module.exports = router;