/**
 * Created by bolo on 14-2-24.
 */

module.exports = function(app, model){
    //http://localhost:3000/people/tang  tang这个用户的展示页面
    app.get('/people/:username',function(req,res){
        var username = req.params.username;
        console.log(username);
        model.User.get(username, function(err, data){
            if(data)
            {
                res.render('people/people', {'one':data});
            }
            else
            {
                console.log(err);
            }

        });
    });


    //发生编辑和修改个人信息的请求地址http://localhost:3000/people
    app.post('/people/edit',function(req,res){
    });

};