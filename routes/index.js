
/*
 * GET home page.
 */
var model = require('../models');
var login = require('./login');
var reg = require('./register');
var home = require('./home');
var ask = require('./ask');
var question = require('./question');
var people = require('./people');
var admin = require('./admin');
var error = require('./error');
var answer = require('./answer');
var crawler = require('./pagecrawler');


module.exports = function(app){

    //login && loginout
    //http://localhost:3000/login 发送登陆信息接受地址
    //http://localhost:3000/loginout  登出请求地址
    login(app, model);

    //reg
    //http://localhost:3000/reg 发送注册信息接受地址
    reg(app, model);

    //http://localhost:3000/show  网站登陆后内容展示页
    home(app, model);

    //ajax异步的get请求获取地址http://localhost:3000/getQuestion
    //http://localhost:3000/question/1 具体问题展示页
    question(app, model);

    //http://localhost:3000/people/tang  tang这个用户的展示页面
    //发生编辑和修改个人信息的请求地址http://localhost:3000/people
    people(app);

    //http://localhost:3000/error 404和错误页面展示地址
    error(app);

    //ajax异步提问发生问题地址http://localhost:3000/ask
    ask(app, model);

    //ajax异步回答问题地址http://localhost:3000/answer
    answer(app, model);

    //百度百科爬虫获取地址
    crawler(app);

    //后台管理 /admin
    //管理员登陆发送信息地址/adminLogin
    //信息管理页面地址 /admincon
    //发生修改信息地址 /adminchange
    admin(app);
};
