/**
 * Created by bolo on 14-3-2.
 */

//配置session，使用redis存储session
module.exports = function(app, express, setting){
    var RedisStore = require('connect-redis')(express);
    app.use(express.cookieParser());
    app.use(express.session({
        secret:setting.cookieSecret,
        store: new RedisStore({
            host:setting.cookieHost,
            port:setting.cookiePort
        }),
        cookie:{maxAge:setting.cookieMaxAge}
    }));

};