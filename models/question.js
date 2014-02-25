/**
 * Created by bolo on 14-2-22.
 */
var connection = require('./db');
var Schema = connection.Schema;
var db = connection.connectoin;

var questionSchemaDict = {
    _id: {type:Number, required:true},
    time: Schema.Types.Mixed,
    hide: Boolean,
    title: {type:String, required:true},
    content: {type:String, required:true},
    answer:{type:[String], required:false},
    username: {type:String, required:true}
};

var QuestionSchema = new Schema(questionSchemaDict, {_id:false});
var QuestionModel = db.model('Question', QuestionSchema);

function Question(question){
    this._id = question._id;
    this.time = question.time;
    this.hide = question.hide;
    this.title = question.title;
    this.content = question.content;
    this.answer = question.answer;
    this.username = question.username;
};

Question.getLastID = function(cb){
    var lastid = 0;
    QuestionModel.findOne({}).sort('-time').exec(function(err, que){
        if(que)
        {
            lastid = que._id;
        }
        cb(lastid);
    });
}


exports.QuestionModel = QuestionModel;
exports.Question = Question;
