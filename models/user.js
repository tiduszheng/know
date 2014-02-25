/**
 * Created by bolo on 14-2-19.
 */
var connection = require('./db');
var Schema = connection.Schema;
var db = connection.connectoin;
var QuestionModel = require('./question').QuestionModel;
var Question = require('./question').Question;

//UserSchema dictionary
var userSchemaDict = {
    name:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:false},
    address:{type:String, required:false},
    company:{type:String, required:false},
    school:{type:String, required:false},
    info:{type:String, required:false},
    imgUrl:{type:String, required:false}
};

var UserSchema = new Schema(userSchemaDict);
var UserModel = db.model('User', UserSchema);

//User calss
function User(user){
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
    this.address = user.address;
    this.company = user.company;
    this.school = user.school;
    this.info = user.info;
    this.imgUrl = user.imgUrl;
};


//dao
User.prototype.save = function(cb){
    //callback 是执行玩保存后的回调函数
    var user = {
        name: this.name,
        password: this.password,
        //下面内容在注册时不用填，在个人首页可以修改，所以先设置默认值和默认头像
        address:"暂无",
        company:"暂无",
        school:"暂无",
        info:"暂无",
        imgUrl:"./public/images/11.jpg"
    }

    var userEntity = new UserModel(user);
    userEntity.save(function(err){
        if(err)
        {
            console.log(user.name+' save fail');
            console.log(err);
        }
        cb(err, user);//成功！返回插入的用户信息
    });
};


User.ask = function(ask, cb){
    var question = {
        time : ask.time,
        hide : false,
        title : ask.title,
        content : ask.content,
        answer : [],
        username : ask.username
    };

    var date = new Date(); //获取当前时间，在存入问题时，我们给问题添加一个时间属性
    var time = {
        date: date,
        year : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth()+1),
        day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
    }
    question.time=time;

    //获取最新的id
    Question.getLastID(function(lastid){
        console.log('lastid:'+lastid);
        question._id = ++lastid;

        var questionEntity = new QuestionModel(question);
        questionEntity.save(function(err, doc){

            if(doc)
            {
                cb(err, doc);
            }
            else
            {
                console.log(err);
                cb(err, null);
            }
        });
    });
};



User.get = function(name, cb){
    UserModel.findOne({'name':name},'some select', function(err, user){
        if(user)
        {
            console.log('find '+user.name+' no error');
            var foundUser = new User(user);
            cb(err, foundUser);//成功！返回查询的用户信息
        }
        else
        {
            console.log('Find '+name+' for User failed');
            cb(err, null);//失败！返回null
        }
    });
};


User.login = function(name, password, cb){
    UserModel.findOne({name:name, password:password}, function(err, user){
        if(user)
        {
            var theUser = new User(user);
            cb(err, theUser); //登录成功
        }
        else
        {
            cb(err, null);
        }

    });
};


User.getQuestions = function(cb){
    User.getQuestionPage(0,function(data){
        cb(data);
    });
    /*QuestionModel.find({hide:false}).limit(5).sort('-time').exec(function(err, data){
        //在user表中查询imgurl
        var max = data.length;
        if(max > 0)
        {

            var total = 0;
            for(var i = 0; i < max;i++){

                UserModel.findOne({name:data[i].username}, function(err, item){
                    data[total]['imgUrl'] = item.imgUrl;
                    total++;
                    if(total == max)
                    {
                        cb(data);
                    }
                });
            }
        }
        else
        {
            return cb(data);
        }
    });*/
};

User.getQuestionPage = function(page, cb){
    //打开数据库
    var num = page * 5;
    QuestionModel.find({hide:false}).skip(num).limit(5).sort('-time').exec(function(err, data){
        //在user表中查询imgurl
        var max = data.length;

        if(max > 0)
        {
            var total = 0;
            for(var i = 0; i < max;i++){
                UserModel.findOne({name:data[i].username}, function(err, item){
                    data[total]['imgUrl'] = item.imgUrl;
                    total++;
                    if(total == max)
                    {
                        cb(data);
                    }
                });
            }
        }
        else
        {
            return cb(data);
        }
    });

};


User.findQuestion = function(id, cb){
    QuestionModel.find({_id:Number(id)}).exec(function(err, items){
        cb(err, items);
    });
};

User.answer = function(qid, answer, cb){
    //update question's answer
    QuestionModel.update({_id:qid},{$push:{answer:answer}}, function(err, items){
        if(err)
        {console.log(err);}
        cb(err, items);
    });
};

module.exports = User;