/**
 * Created by bolo on 14-2-22.
 */
var connection = require('./db');
var Schema = connection.Schema;
var db = connection.connectoin;

var questionSchemaDict = {
    time: Schema.Types.Mixed,
    hide: Boolean,
    title: {type:String, required:true},
    content: {type:String, required:true},
    answer:{type:[String], required:false},
    username: {type:String, required:true}
};

var QuestionSchema = new Schema(questionSchemaDict);
var QuestionModel = db.model('Question', QuestionSchema);

function Question(question){
    this.time = question.time;
    this.hide = question.hide;
    this.title = question.title;
    this.content = question.content;
    this.answer = question.answer;
    this.username = question.username;
};


exports.QuestionModel = QuestionModel;
exports.Question = Question;
