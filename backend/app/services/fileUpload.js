const multer = require('multer');
const AWS = require('aws-sdk');

const config = require('../config/config');

AWS.config.update({
    accessKeyId: config.aws.access_key_id,
    secretAccessKey: config.aws.secret_access_key
})
const uploadUrl = config.aws.url;
var s3 = new AWS.S3();

module.exports = {
    uploadPhoto(req, callback) {
        const bucketName = 'wgvapp';
        const file = req.file;

        let fileUrl = '';
        s3.headBucket({Bucket: bucketName}, function(err, data) {
            var fileName = new Date().getTime();
            if (err){
                s3.createBucket({Bucket: bucketName}, function(err, data) {
                    if (err){
                        callback(err)
                    }
                    else{

                        buf = new Buffer(file.buffer, 'base64')

                        const params = {
                            Bucket: bucketName,
                            Key: fileName + '.jpeg',
                            Body: buf,
                            ContentEncoding: 'base64',
                            ContentType: 'image/jpeg',
                            ACL:'public-read'
                        };
                        s3.putObject(params, function(perr, pres){
                            if (err) {
                                callback(err)
                            } else {
                                fileUrl = uploadUrl + bucketName + '/' + params.Key;
                                callback(null, fileUrl);
                            }
                        });
                    }
                });
            } else {
                buf = new Buffer(file.buffer, 'base64')

                const params = {
                    Bucket: bucketName,
                    Key: fileName + '.jpeg',
                    Body: buf,
                    ContentEncoding: 'base64',
                    ContentType: 'image/jpeg',
                    ACL:'public-read'
                };
                s3.putObject(params, function(perr, pres) {
                    if (err) {
                        callback(err)
                    } else {
                       	fileUrl = uploadUrl + bucketName + '/' + params.Key;
                        callback(null, fileUrl);
                    }
                });
            }
        });
    }
}
