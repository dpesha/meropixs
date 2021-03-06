/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , routes = require('./routes')
  , rest = require('./rest/users');

// Bootstrap db connection
require('./db-connect');

// Bootstrap models
var models_path = __dirname + '/app/models'
  , model_files = fs.readdirSync(models_path)
model_files.forEach(function (file) {
  if (file == 'user.js')
    User = require(models_path+'/'+file)
  else
    require(models_path+'/'+file)
})  

// create Server 
var app = module.exports = express.createServer();




// Configuration
app.configure(function(){
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "secret"}));
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public')); 
  app.use(everyauth.middleware());     
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

function authenticate(req,res,next){
  if(req.user){
    next();
  } else {
    routes.error(req,res);
  }
}

// Routes
app.get('/', routes.index);
app.get('/auth/facebook/cb', routes.fbcallback);

// RESTFUL URL
app.get('/users', authenticate, rest.listUsers);
app.post('/users', authenticate, rest.newUser);
app.get('/users/:id', authenticate, rest.viewUser);
app.put('/users/:id', authenticate, rest.updateUser);
app.delete('/users/:id', authenticate, rest.deleteUser);
app.get('/fblogin', rest.getFBLogin);

everyauth.helpExpress(app);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


