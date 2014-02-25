/**
 * Created by bolo on 14-2-24.
 */

module.exports = function(app){
    //http://localhost:3000/people/tang  tang这个用户的展示页面
    app.get('/people/:user',function(req,res){
    });
    //发生编辑和修改个人信息的请求地址http://localhost:3000/people
    app.post('/people',function(req,res){
    });

};