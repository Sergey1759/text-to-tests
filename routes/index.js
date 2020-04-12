var express = require("express");
var router = express.Router();
var api = require("./apiUser");
var group = require("./apiGroup");
var multer_ = require("./multer");
var apiTest = require("./apiTest");
var apiGroup = require("./apiGroup");
var apiTestResult = require("./apiTestResult");

var ApiMessage = require("./ApiMessage");
var ApiRooms = require("./ApiRooms");

var ApiSocket = require("./ApiSocket");



/* GET home page. */
router.get("/", async function (req, res, next) {
  let names_group = await apiGroup.getAllForAuth();
  if (req.session.user) {
    var data = {
      title: "Express",
      user: req.session.user
    };
    res.redirect("some");
    // res.render('index', data);
  } else {
    var data = {
      title: "Express"
    };
    res.render("index", {
      names_group
    });
  }
  // console.log(req.session)
});

router.get("/addGroup", async function (req, res, next) {
  res.render('addGroup');
});
router.post('/addGroup', async function (req, res, next) {
  await apiGroup.createGroup(req.body.name_group);
  res.redirect('/addGroup');
});

router.get("/some", midleware, async function (req, res, next) {
  let user = await api.getByID(req.session.user.id);
  let classs = [];
  let groupdate = await group.get(user.group);
  if (groupdate) {
    let obj = groupdate.students;
    for (const id of obj) {
      if (id != user.id && id != false) {
        let buf = await api.getByID(id);
        classs.push(buf);
      }
    }
  } else {
    console.log("error group is not created");
  }
  res.render("some", {
    user,
    classs
  });
  // res.render('some',{user});
});

router.get("/addTest", midleware, isAdmin, async function (req, res, next) {
  let allgroups = await group.getAll();
  res.render("addTest", {
    allgroups
  });
});

function midleware(req, res, next) {
  if (req.session.user) {
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
  console.log(all_users);
  res.render("UsersControl", {
    all_users
  });
});

router.post(
  "/upload",
  midleware,
  isAdmin,
  multer_.midlle_for_multer,
  async function (req, res, next) {
    console.log(req.body);
    multer_.uploading(req);
    res.redirect("/addTest");
  }
);

router.get("/my_tests", midleware, async function (req, res, next) {
  let my_group = await group.get(req.session.user.group);
  let tests = my_group.tests;
  let test = await apiTest.getAll();
  let arr = [];
  for (let i = 0; i < tests.length; i++) {
    for (let j = 0; j < test.length; j++) {
      if ("" + tests[i] == "" + test[j]._id) {
        arr.push({
          id: "" + test[j]._id,
          name: test[j].name
        });
      }
    }
  }
  res.render("my_tests", {
    arr
  });
});

router.get("/my_tests/:name", midleware, async function (req, res, next) {
  let test = await apiTest.getByID(req.params.name);
  // console.log(test)
  res.render("name", {
    test
  });
});

router.post("/upload_test_result", midleware, async function (req, res, next) {
  let response_user_result = await api.getByIDandReturnResult(
    req.session.user.id
  );
  let response_Result = await apiTestResult.findUserResult(
    req.body.idTest,
    req.session.user.id
  );
  let response_checked_test = await apiTest.checkTests(
    req.body.idTest,
    req.body.arr
  );
  // console.log(response_Result[0]._id)

  if (response_user_result.length && response_Result[0] != undefined) {
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
              count: +elem_checked.value
            });
        }
        let req_for_attempt = await apiTestResult.insertIdRESULT(
          response_Result[0]._id,
          buf_arr
        );
        req_for_attempt = req_for_attempt.attempt;
        await apiTestResult.insertIdAttempt(
          response_Result[0]._id,
          ++req_for_attempt
        );
        // console.log(buf_arr);
      } else {
        throw new Error(
          "in upload_test_result something is not working correctly"
        );
      }
    }
  } else {
    let buf_arr = response_checked_test.map(elem => {
      return {
        id: elem.id,
        count: +elem.value
      };
    });
    let isCreateResult = await apiTestResult.createUserResult(
      req.body.idTest,
      req.session.user.id,
      buf_arr
    );
    // console.log(isCreateResult);
    let buf_user_result = [];
    buf_user_result.push(isCreateResult._id);
    await apiTestResult.insertIdAttempt(isCreateResult._id, 1);
    await api.insertIdRESULT(req.session.user.id, buf_user_result);
  }
  // console.log(req.body.idTest)
  // await api.delete_result(req.session.user.id);
  res.send({
    m: "hi"
  });
});

router.get("/chat", midleware, async function (req, res, next) {
  let user = await api.getByID(req.session.user.id);
  let user_chats_id = user.chats;
  let user_chats = await ApiRooms.getIncludes(user_chats_id);
  res.render("chat", {
    user_chats
  });
});

router.get("/chat/:id", midleware, async function (req, res, next) {
  let userID = req.session.user.id;
  console.log(req.params);
  let RoomID = req.params.id;
  let massage = await ApiMessage.getChatById(RoomID);
  console.log(massage);
  res.render("chat_id", {
    userID,
    RoomID,
    massage
  });
});

router.get("/my_result", midleware, async function (req, res, next) {

  res.render("my_result");
});


router.get("/classmates", midleware, async function (req, res, next) {
  let classs = [];
  let groupdate = await group.get(req.session.user.group);
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
    classs
  });
});

router.post("/classmates", midleware, async function (req, res, next) {
  console.log(req.body.classmates_id)
  let classmates = await api.getByID(req.body.classmates_id);
  let new_room = await ApiRooms.createRooms(`${req.session.user.name}-${classmates.name}`);
  await api.addChatRooms(classmates._id, new_room._id);
  await api.addChatRooms(req.session.user.id, new_room._id);
  res.redirect('/chat');
});


module.exports = router;