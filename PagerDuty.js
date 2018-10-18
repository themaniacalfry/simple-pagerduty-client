var request =require('request')
class PagerDuty {
    constructor(params) {
        this.serverURL = 'https://api.pagerduty.com'
        this.authToken = params.authToken;
        this.uri = params.uri;
    }
    getServices()
    {
        const options = {
            url: `${this.serverURL}/services${this.uri}`,
            method: "GET",
            headers: {
              Accept: "application/vnd.pagerduty+json;version=2",
              Authorization: `Token token=${this.authToken}`
            } ,
            rejectUnauthorized:false
          }; 
          return new Promise(function(resolve,reject){
              var parsedBody;

              request.get(options,function(err,response,body){
                  if (err){
                      reject(err)
                  }
				  if(body.includes('Authorization Required') || response.statusCode==401){
                      return reject('Unautorized')
                  }
                  parsedBody=JSON.parse(body)
                  if (parsedBody.error)
                  {
                      reject(parsedBody.error.message)
                  }
                  resolve(parsedBody.services)
              })
          })
    }
    getIncidents() {
        const options = {
            url: `${this.serverURL}/incidents${this.uri}`,
            method: "GET",
            headers: {
              Accept: "application/vnd.pagerduty+json;version=2",
              Authorization: `Token token=${this.authToken}`
            } ,
            rejectUnauthorized:false
          }; 
          return new Promise(function(resolve,reject){
              var parsedBody;

              request.get(options,function(err,response,body){
                  if (err){
                      reject(err)
                  }
				  if(body.includes('Authorization Required') || response.statusCode==401){
                      return reject('Unautorized')
                  }
                  parsedBody=JSON.parse(body)
                  if (parsedBody.error)
                  {
                      reject(parsedBody.error.message)
                  }
                  resolve(parsedBody.incidents)
              })
          })
    }
    createIncident(source,newIncident){
        const options = {
            url: `${this.serverURL}/incidents${this.uri}`,
            method: "POST",
            headers: {
              Accept: "application/vnd.pagerduty+json;version=2",
              Authorization: `Token token=${this.authToken}`,
              from:source,
              'Content-Type': 'application/json'
            },
            rejectUnauthorized:false,
            body: JSON.stringify(newIncident)
          };
          return new Promise(function(resolve,reject){
            var parsedBody;

            request.post(options,function(err,response,body){
                if (err){
                    reject(err)
                }
				if(body.includes('Authorization Required') || response.statusCode==401){
                      return reject('Unautorized')
                  }
                parsedBody=JSON.parse(body)
                if (parsedBody.error)
                {
                    reject(parsedBody.error)
                }
                resolve(parsedBody.incident)
            })
        }) 

    }
    getOnCallPersonelList() {
        const options = {
            url: `${this.serverURL}/oncalls${this.uri}`,
            method: "GET",
            headers: {
              Accept: "application/vnd.pagerduty+json;version=2",
              Authorization: `Token token=${this.authToken}`
            } ,
            rejectUnauthorized:false,
          }; 
          return new Promise(function(resolve,reject){
              var parsedBody;

              request.get(options,function(err,response,body){
                  if (err){
                      reject(err)
                  }
				  if(body.includes('Authorization Required') || response.statusCode==401){
                      return reject('Unautorized')
                  }
                  parsedBody=JSON.parse(body)
                  if (parsedBody.error)
                  {
                      reject(parsedBody.error.message)
                  }
                  resolve(parsedBody.oncalls)
              })
          })
    }
    getSchedules() {
        const options = {
            url: `${this.serverURL}/schedules${this.uri}`,
            method: "GET",
            headers: {
              Accept: "application/vnd.pagerduty+json;version=2",
              Authorization: `Token token=${this.authToken}`
            } ,
            rejectUnauthorized:false
          }; 
          return new Promise(function(resolve,reject){
              var parsedBody;

              request.get(options,function(err,response,body){
                  if (err){
                      reject(err)
                  }
				  if(body.includes('Authorization Required') || response.statusCode==401){
                      return reject('Unautorized')
                  }
                  parsedBody=JSON.parse(body)
                  if (parsedBody.error)
                  {
                      reject(parsedBody.error.message)
                  }
                  resolve(parsedBody.schedules)
              })
          })
    }
    
}

module.exports=PagerDuty