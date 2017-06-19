var JsonDB = require('node-json-db');
var params = require('./parameters.js');
module.exports = function(){
    this.getConnection = function(){
        //The second argument tells the DB to save after each push 
        //The third argument asks JsonDB to save the database in an human readable format.
        return new JsonDB(params.database_file_name, true, false);
    }

    this.refreshExecCount = function(){        
        //refresh count server start
        try {
            var data = this.getConnection().getData("/server-start-count");
            this.getConnection().push("/server-start-count", ++data, true);
        } catch(error) {
            this.getConnection().push("/server-start-count", 1, true);
        }
    }

    this.URL = function(){
            this.url = '';
            this.succesfulRespSLO = 0;
            this.fastRespSLO = 0;
            this.qtdRequests=0;
            this.qtdSuccesResp=0;
            this.qtdFastResp=0;
            this.succesfulRespSLI = 0;
            this.fastRespSLI = 0;

            this.init = function(url, succesfulResp, fastResp){
                this.url = url;
                this.succesfulRespSLO = succesfulResp;
                this.fastRespSLO = fastResp;
                return this;
            }

            this.calcSuccesfulRespSLI = function(qtdSuccesResp, qtdRequests){
                return qtdSuccesResp / qtdRequests;
            }
            this.calcFastRespSLI = function(qtdFastResp,  qtdRequests){
                return qtdFastResp / qtdRequests;
            }
            return this;
        }

     this.saveURL = function(url, succesfulResp, fastResp){        
        this.getConnection().push("/urls[]", new URL().init(url, succesfulResp, fastResp));
     }
    return this;
}
