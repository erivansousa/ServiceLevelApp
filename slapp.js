var slapp = require('express')();
var db = require('./app/model/database.js')();
var bodyParser = require('body-parser');
slapp.use(bodyParser.urlencoded({extended:true}));

slapp.set('view engine', 'ejs');
slapp.set('views', './app/views');
db.refreshExecCount();

 //default view file on the views directory
slapp.get('/', function(req, res){
    res.render("index");
});

slapp.post('/refresh', function(req, res){
    var dataBody = req.body;
    console.log(dataBody.url);
    db.saveURL(dataBody.url, dataBody.sRespSLO, dataBody.fRespSLO);
    //res.send(dataBody);
});

//start server
slapp.listen(3000, function(){
    console.log("Server ON");
});

