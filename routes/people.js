/**
 * Created by bolo on 14-2-24.
 */

module.exports = function(app, model){

    app.get('/people', function(req, res){
        res.render('people/edit',{'user':req.session.user});
    });

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
    app.post('/people',function(req,res){
        //头像地址
        var tmp_path,target_path;
        if(req.files.headimg.size>0){ //表示有图片文件上传
            tmp_path = req.files.headimg.path;
            // 指定文件上传后的目录 - 示例为"images"目录。
            // 重命名图片名字
            var picType=req.files.headimg.name.split(".");
            picType=picType[1];
            target_path = './public/images/user/pic_' + req.session.user.name+"."+picType;
            // 移动文件
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                //程序执行到这里，user文件下面就会有一个你上传的图片
            });
        }
    });

};