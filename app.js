//引入express模块
let express = require('express');
//引入自定义模块
let todoController=require('./controller/todoController');
//实例化express对象
let app = express();
//配置视图引擎
app.set('view engine', 'ejs');
//让服务器识别外部样式表
app.use(express.static('./public'));
todoController(app);
app.listen(3000);