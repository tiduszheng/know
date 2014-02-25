/**
 * Created by bolo on 14-2-24.
 */
var User = require('../models/user');


module.exports = function(app){
    //ajax异步的get请求获取地址http://localhost:3000/getQuestion
    app.get('/getQuestion',function(req,res){
        User.getQuestionPage(req.query.page,function(data){

            //对返回的数据做些处理
            for(var i=0,l=data.length;i<l;i++){
                data[i].imgUrl=data[i].imgUrl.replace("./public/","");
            }
            res.send(data);

        });
    });

    //http://localhost:3000/question/1 具体问题展示页
    app.get('/question/:id',function(req,res){
        User.findQuestion(req.params.id, function(err, items){

            res.render('question',{
                items:items[0],
                user:req.session.user,
                id:req.params.id
            });
        });
    });

};