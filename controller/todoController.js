// 引入mongoos模块
let mongoose=require('mongoose');
//连接数据库
mongoose.connect('mongodb://todoapp:qinian521@ds219000.mlab.com:19000/cjtodo');
//创建图表
let todoSchema=new mongoose.Schema({
    item:String,
});
//往数据库中存储数据
let Todo=mongoose.model('Todo',todoSchema);
// Todo({item:'Hello,ChangJun!'}).save(function (err,data) {
//    if (err) throw err;
//    console.log('保存成功');
// });
let bodyParser=require('body-parser');
//对数据进行解析
let urlencodeParser=bodyParser.urlencoded({extended:false});

// let data=[
//     {item:'欢迎大家来到常峻的ToDoApp！'},
//     {item:'这是一次NodeJS实战'},
//     {item:'通过本次课程对学到的NodeJS知识练习'},
// ];

module.exports=function (app) {
    //获取数据
    app.get('/todo',function (req,res) {
        Todo.find({},function (err,data) {
           if(err) throw err;
            res.render('todo',{todos:data});
        });
    });
    //传递数据
    app.post('/todo',urlencodeParser,function (req,res) {
        Todo(req.body).save(function (err,data) {
            if(err) throw err;
            res.json(data);
        });
    });
    //删除数据
    app.delete('/todo/:item',function (req,res) {
        Todo.find({item:req.params.item}).remove(function (err,data) {
            if(err) throw err;
            res.json(data);
        });
        // data=data.filter(function (todo) {
        //     return req.params.item!==todo.item;
        // });
        // res.json(data);
    });
};