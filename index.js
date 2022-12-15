// ----------------------------  SETTINGS --------------------------------

/*
    Put your Salesforce B2C Commerce Cloud POD number in the following variable
*/
const POD_NUMBER = YOUR POD NUMBER HERE;

// ----------------------------  PROGRAM --------------------------------

if (https == null) {
    var https = require('https');
}
  
if (querystring == null) {
  var querystring = require('querystring');
}

const options = {
  hostname: 'api.status.salesforce.com',
  port: 443,
  path: '/v1/instances/POD' + POD_NUMBER + '/status?productKey=B2C_Commerce_Cloud&childProducts=false',
  method: 'GET'
}

const req = https.request(options, response => {
    if (response.statusCode == 200) {
        var body = '';

        response.on('data', function(chunk){
            body += chunk;
        });

        response.on('end', function(){
            var jsonBody = JSON.parse(body);

            $util.insights.set('pod', jsonBody.key);
            $util.insights.set('location', jsonBody.location);
            $util.insights.set('status', jsonBody.status);
            $util.insights.set('incidents', JSON.stringify(jsonBody.Incidents));
        });
    } else {
        console.log('Non-200 HTTP response: ' + response.statusCode);
    }
})

req.on('error', error => {
  console.error(error)
})

req.end()
