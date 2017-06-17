var JsonDB = require('node-json-db');
//The second argument tells the DB to save after each push 
//The third argument asks JsonDB to save the database in an human readable format.
module.exports = function(){
    this.getConnection = function(){
        return new JsonDB("slDataBase", true, true);
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

     this.saveURL = function(url, succesfulResp, fastResp){
        var URL = function(url, succesfulResp, fastResp){
            this.ulr = url;
            this.succesfulRespSLO = succesfulResp;
            this.fastRespSLO = fastResp;
            this.qtdRequests=0;
            this.qtdSuccesResp=0;
            this.qtdFastResp=0;

            this.succesfulRespSLI = function(){
                return this.qtdSuccesResp / this.qtdRequests;
            }
            this.fastRespSLI = function(){
                return this.qtdFastResp / this.qtdRequests;
            }
            return this;
        }
        
        this.getConnection().push("/urls[]", JSON.parse(JSON.stringify(new URL(url, succesfulResp, fastResp))));
     }
    return this;
}
