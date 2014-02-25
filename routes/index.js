
/*
 * GET home page.
 */
var User = require('../models/user.js'); //引入用户登录函数
var login = require('./login');
var reg = require('./register');
var show = require('./show');
var ask = require('./ask');
var question = require('./question');
var people = require('./people');
var admin = require('./admin');
var error = require('./error');
var answer = require('./answer');
var crawler = require('./pagecrawler');

module.exports = function(app){
    app.get('/', function(req, res){
        //因为登陆成功会将信息记录到session中，所有如果不存在就到登陆注册页面，如果存在就表示用户已经登陆，直接跳转到展示页面
        if(!req.session.user){
            res.render('index', {
                title:"知道",
                name:"问答平台",
                user:req.session.user, //这里可以用ejs摸版的locals.user 访问到
                error: req.flash('error').toString(),  //这里可以用ejs摸版的locals.error 访问到
                success: req.flash('success').toString()  //这里可以用ejs摸版的locals.success 访问到
            });
        }else{
            res.redirect('/show');
        }
    });

    //login && loginout
    //http://localhost:3000/login 发送登陆信息接受地址
    //http://localhost:3000/loginout  登出请求地址
    login(app);

    //reg
    //http://localhost:3000/reg 发送注册信息接受地址
    reg(app);

    //http://localhost:3000/show  网站登陆后内容展示页
    show(app);

    //ajax异步的get请求获取地址http://localhost:3000/getQuestion
    //http://localhost:3000/question/1 具体问题展示页
    question(app);

    //http://localhost:3000/people/tang  tang这个用户的展示页面
    //发生编辑和修改个人信息的请求地址http://localhost:3000/people
    people(app);

    //http://localhost:3000/error 404和错误页面展示地址
    error(app);

    //ajax异步提问发生问题地址http://localhost:3000/ask
    ask(app);

    //ajax异步回答问题地址http://localhost:3000/answer
    answer(app);

    //百度百科爬虫获取地址
    crawler(app);

    //后台管理 /admin
    //管理员登陆发送信息地址/adminLogin
    //信息管理页面地址 /admincon
    //发生修改信息地址 /adminchange
    admin(app);
};
