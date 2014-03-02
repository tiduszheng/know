/**
 * Created by bolo on 14-2-24.
 */

var crypto = require('crypto'); //密码加密模块


module.exports = function(app, model){

    app.get('/login', function(req, res){
        res.render('login');
    });

    //发送登陆信息接受地址http://localhost:3000/login
    app.post('/login',function(req,res){
        var username = req.body.name;
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');

        var user = model.User.login(username, password, function(err, user){
            if(user)
            {
                req.session.user = user;
                res.redirect('/home');
            }
            else
            {
                req.flash('error', '用户名密码不匹配');
                res.redirect('/login');
            }
        });
    });

    //http://localhost:3000/loginout  登出请求地址
    app.get('/loginout',function(req,res){
        req.session.user = null;
        req.flash('success','登出成功!');
        res.redirect('/');
    });
};