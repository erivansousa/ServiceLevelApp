var db = require('./database.js')();
var http = require('http');

module.exports = function(parameters){
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
            
            //make the request, checks its time and status code
            http.get({host: register.url, path: '/'}, function(res){
                var time = Date.now() - initialTime;
                db.getConnection().push('/millis', time, true);
                
                if(200 <= res.statusCode <= 499){
                    db.getConnection().push('/stOk', true, true);
                }                
            }).on('error', function(err){
                db.getConnection().push('/stOk', false, true);
            });

            var responseTime = Date.now() - initialTime;
            register.qtdRequests += 1;

            
            try{
                if(db.getConnection().getData('/millis') <= parameters.slo_limit_response_millis){
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
            
            //replaces the measures result on the database
            db.getConnection().push("/urls["+i+"]", register, true);
        }

        //clean up the temp data on the "database"
        db.getConnection().push('/stOk', false, true);
        db.getConnection().push('/millis', 0, true);    
    }

    this.loop = function(){
        console.log("loop is running...");
        refreshSLI();      
        setTimeout(loop, parameters.process_running_millis);
    }

    return this;
}