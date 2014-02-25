/**
 * Created by bolo on 14-2-24.
 */
var User = require('../models/user');

module.exports = function(app){
    //ajax异步回答问题地址http://localhost:3000/answer
    app.post('/answer',function(req,res){
        var answer={};
        answer.answer=req.body.answer;
        answer.user=req.session.user;
        questionId=req.body.questionId;
        User.answer(questionId,answer,function(info){
            res.redirect('/question/'+questionId);
        })
    });
};