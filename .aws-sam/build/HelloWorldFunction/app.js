'use strict';

console.log('Loading function');

var AWS = require('aws-sdk');
var S3 = new AWS.S3({
    maxRetries: 0,
    region: 'us-east-1',
});


let response;

/**
 *
 *
 */




exports.lambdaHandler = async (event, context, callback) => {
    try {
        console.log('Received event:', JSON.stringify(event, null, 2));
        console.log("Init complete, running.. \n")

        var srcBucket = event.Records[0].s3.bucket.name;
        var srcKey = event.Records[0].s3.object.key;

        console.log("Params: srcBucket: " + srcBucket + " srcKey: " + srcKey + "\n")

        console.log("Params: srcBucket: " + srcBucket + " srcKey: " + srcKey + "\n")

        S3.getObject({
            Bucket: srcBucket,
            Key: srcKey,
        }, function (err, data) {
            if (err !== null) {
                return callback(err, null);
            }
            var fileData = data.Body.toString('utf-8');


            response = {
                'statusCode': 200,
                'body': JSON.stringify({
                    message: 'hello world',
                    // location: ret.data.trim()
                })
            }

        }) 
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};
