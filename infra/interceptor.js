/**
 * Created by bolo on 14-3-2.
 */
var User = require('../models/user.js'); //引入用户登录函数


module.exports = function(app){
    app.use(function(req, res, next){
        //如果未登录或session失效，跳转到登录页
        if(!req.session.user && req.originalUrl != '/login' && req.originalUrl != '/reg'){
            return res.redirect('/login');
        }

        //如果已经登录，还要登录的话则自动跳转到主页
        if(req.session.user && (req.originalUrl === '/login' || req.originalUrl === '/reg' )){
            return res.redirect('/home');
        }
        res.locals.user = req.session.user;

        next();
    });
}