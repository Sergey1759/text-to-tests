var mongoose = require('mongoose')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var Tests = require('./ModelTests');

function createTest(name , arr){
    test = {
        name : name,
        test : arr
    }
    return new Tests(test).save();
}

function getByID(id) {
    return Tests.findOne({_id : id}, function (err, doc) {
        return Promise.resolve(doc);
      });
}
function getAll() {
    return Tests.find({}, function (err, doc) {
        return Promise.resolve(doc);
      });
}
function checkTests(id,arr){
    let arr_local = [];
    return getByID(id).then(res => {
        for (const iterator of res.test) {
            for (const input of arr) {
                if(iterator.id == input.form_id && iterator.right == input.input_id){
                    arr_local.push({id : iterator.id, value : true})
                } else if(iterator.id == input.form_id && iterator.right != input.input_id){
                    arr_local.push({id : iterator.id, value : false})
                }
            }
        }
        return arr_local;
    })
    
    
}
module.exports = {createTest,getByID,getAll,checkTests}