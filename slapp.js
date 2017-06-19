var slapp = require('express')();
var params = require('./app/model/parameters.js');
var process = require('./app/model/process.js')(params);
var bodyParser = require('body-parser');

slapp.use(bodyParser.urlencoded({extended:true}));
slapp.set('view engine', 'ejs');
slapp.set('views', './app/views');

var db = process.getDataBase();
db.refreshExecCount();

 //default view file on the views directory
slapp.get('/', function(req, res){
    try{
        res.render("index", {refresh_time: params.screen_refresh_millis, 
            urls: db.getConnection().getData('/urls')});
    } catch(error){
        res.render("index", {refresh_time: params.screen_refresh_millis, urls: null});
    }
});

slapp.post('/refresh', function(req, res){
    console.log("refresh requested");
    try{
        res.send({urls: db.getConnection().getData('/urls')});
    } catch(error){
        res.send({urls: null});
    }
});

//include a new url
slapp.post('/include', function(req, res){
    console.log("include requested");
    var dataBody = req.body;
    db.saveURL(dataBody.url, new Number(dataBody.sRespSLO), new Number(dataBody.fRespSLO));
    res.send({urls: db.getConnection().getData('/urls')});
});

//delete all the url database
slapp.post('/delAll', function(req, res){
   console.log("delete all requested");
   db.getConnection().delete('/urls');
   res.send(null);
});

process.loop();

//start server
slapp.listen(params.server_port, function(){
    console.log("Server ON");
});

