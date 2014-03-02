/**
 * Created by bolo on 14-3-2.
 */

module.exports = function(app){
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.redirect('/error');
        //next();
    });
}