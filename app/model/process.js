var db = require('./database.js')();
var http = require('http');
module.exports = function(){
    this.getDataBase = function(){
        return db;
    }
    
    this.refreshSLI = function(){
        var urls = '';
        try{
            urls = db.getConnection().getData('/urls');
        } catch(error){
            //when any urls was stored
            return;
        }

        for(var i = 0; i < urls.length; i++){
            var register = urls[i];
            
            var initialTime = Date.now();
            var start;                
            //make and measure the request
            http.get({host: register.url, path: '/'}, function(res){
                var time = Date.now() - initialTime;
                db.getConnection().push('/millis', time, true);
                
                if((200 <= res.statusCode <= 499)){
                    db.getConnection().push('/stOk', true, true);
                }                
            }).on('error', function(err){});

            var responseTime = Date.now() - initialTime;
            register.qtdRequests += 1;

            
            try{
                if(db.getConnection().getData('/millis') <= 300){
                    register.qtdFastResp += 1;
                }

                if(db.getConnection().getData('/stOk')){
                    register.qtdSuccesResp += 1;
                }
            } catch (err){}

            register.succesfulRespSLI = db.URL()
                .calcSuccesfulRespSLI(register.qtdSuccesResp, register.qtdRequests);
            register.fastRespSLI = db.URL()
                .calcFastRespSLI(register.qtdFastResp, register.qtdRequests);
            
            //store the measures result
            db.getConnection().push("/urls["+i+"]", register, true);
        }
        db.getConnection().push('/stOk', false, true);
        db.getConnection().push('/millis', 0, true);    
    }

    this.loop = function(){
        console.log("loop is running...");
        refreshSLI();      
        setTimeout(loop, 5000);
    }

    return this;
}