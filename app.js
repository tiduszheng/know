
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
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    next();
});
//------------------------------------------------

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//路由配置------------------------------------------------------
routes(app);
//------------------------------------------------------------


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
