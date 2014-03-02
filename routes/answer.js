/**
 * Created by bolo on 14-2-24.
 */


module.exports = function(app, model){
    //ajax异步回答问题地址http://localhost:3000/answer
    app.post('/answer',function(req,res){
        var answer={};
        answer.answer=req.body.answer;
        answer.user=req.session.user;
        questionId=req.body.questionId;
        model.User.answer(questionId,answer,function(info){
            res.redirect('/question/'+questionId);
        })
    });
};