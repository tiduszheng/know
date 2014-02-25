/**
 * Created by bolo on 14-2-24.
 */

var crypto = require('crypto'); //密码加密模块
var User = require('../models/user.js'); //引入用户登录函数

module.exports = function(app){
    //发送登陆信息接受地址http://localhost:3000/login
    app.post('/login',function(req,res){
        var username = req.body.name;
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');

        var user = User.login(username, password, function(err, user){
            if(user)
            {
                req.session.user = user;
                res.redirect('/show');
            }
            else
            {
                req.flash('error', '用户名密码不匹配');
                res.redirect('/');
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