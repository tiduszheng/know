/**
 * Created by bolo on 14-2-24.
 */
var User = require('../models/user.js'); //引入用户登录函数

module.exports = function(app){
    //http://localhost:3000/show  网站登陆后内容展示页
    app.get('/show',function(req,res){
        User.getQuestions(function(data){  //使用User.getQuestion()获取问题
            console.log('data.length:'+data.length);
            if(data.length==0){//数据库没有内容
                res.render('show',{
                    lists:data,
                    user:req.session.user
                });
                return;
            }
            for(var i=0,l=data.length;i<l;i++){
                data[i].url="/people/"+data[i].name;
                data[i].imgUrl=data[i].imgUrl.replace("./public/","");
            }
            res.render('show',{
                lists:data,
                user:req.session.user
            });
        });
    });
}