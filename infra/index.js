/**
 * Created by bolo on 14-3-2.
 */
//When require is given the path of a folder,
// it'll look for an index.js in that folder;
// if there is one, it uses that, and if there isn't, it fails

exports.interceptor = require('./interceptor');
exports.errorhandle = require('./errorhandle');
exports.sessionconfig = require('./sessionconfig');

