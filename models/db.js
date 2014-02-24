/**
 * Created by bolo on 14-2-18.
 */
var setting = require('../setting');
var mongoose = require('mongoose');
mongoose.connect('mongodb://'+setting.dbHost+':{'+setting.dbPort+'}/{'+setting.db+'}');
mongoose.connection.on('error', console.error.bind(console,'DB connect error'));
mongoose.connection.once('open', function(){console.log(setting.db + ':DB connect success')});
exports.connectoin = mongoose.connection;
exports.Schema = mongoose.Schema;
