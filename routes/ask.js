/**
 * Created by bolo on 14-2-24.
 */

module.exports = function(app, model){
    //ajax异步提问发生问题地址http://localhost:3000/ask
    app.post('/ask',function(req,res){
        var ask={};
        ask.title=req.body.title; //post发送的问题标题
        ask.content=req.body.askText; //post发送的问题内容
        ask.answer=[]; //先设置一个空数组，这个数组以后push问题的回答
        ask.username=req.session.user.name; //提问者的名字
        //调用ask函数，存入用户提问
        model.User.ask(ask,function(err, doc){

            if(doc){
                //如果成功存入，返回{"status": 1}给客户端
                res.send({"status": 1});
            }
            else
            {
                req.flash('error',err);
                return res.redirect('/');
            }

        })
    });
};