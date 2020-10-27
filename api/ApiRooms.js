var mongoose = require('mongoose')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var ModelChatRooms = require('../model/ModelChatRooms');

function createRooms(name, type, ...users) {
    return new ModelChatRooms({
        name: name,
        type: type,
        users: users
    }).save();
}

async function getById(id) {
    return ModelChatRooms.findById(id);
}

function getAll() {
    return ModelChatRooms.find({});
}

function updateChatImg(id, url) {
    return ModelChatRooms.findByIdAndUpdate({
        _id: id
    }, {
        img: url
    });
}

function addUserToChat(IdChat, IdUser) {
    return ModelChatRooms.findOne({
        _id: IdChat
    }).then(res => {
        res.users.push(IdUser);
        ModelChatRooms(res).save();
    })
}

async function getIncludes(arr_includes) {
    let all = await getAll();
    let buf = [];
    // console.log(arr_includes)
    for (const one_in_all of all) {
        for (const inc of arr_includes) {
            if ('' + one_in_all._id == inc) {
                buf.push(one_in_all);
            }
        }
    }
    return Promise.resolve(buf);
}

async function getIncludesByIdUsers(...arr) {
    console.log(arr)
    return ModelChatRooms.find({
        users: {
            $in: arr
        }
    });

}


async function addUser(Room_id, User_id) {
    let m = await ModelChatRooms.findOne({
        _id: Room_id
    }).then(res => {
        res.users.push(User_id)
        return Promise.resolve(res);
    })
    return await m.save();
}
module.exports = {
    createRooms,
    getAll,
    addUser,
    getIncludes,
    addUserToChat,
    getById,
    updateChatImg,
    getIncludesByIdUsers,
}