
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var setting = require('./setting');
var flash = require('connect-flash');
var interceptor = require('./interceptor');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

//配置session，使用redis存储session-----------------
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

//放在session后面，拦截器前面
app.use(express.static(path.join(__dirname, 'public')));

//拦截器，处理session等
interceptor(app);
//------------------------------------------------

//路由配置------------------------------------------------------
app.use(app.router);
routes(app);
//------------------------------------------------------------


//异常处理-------------------------------------------------------------------------
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Sorry, It seems that the server has gone for his girlfriend...' +
        'wait for a sec and try again please, ok? he will be back soon. ');
});
//-----------------------------------------------------------------------------------

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
