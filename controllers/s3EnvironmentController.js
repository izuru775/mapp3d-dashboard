require(`dotenv`).config();
const multer = require(`multer`);
const multerS3 = require(`multer-s3`);
const AWS = require(`aws-sdk`);
const path = require("path");
const res = require("express/lib/response");

AWS.config.update({
    region: process.env.REGION,
});

const s3 = new AWS.S3();

const BUCKET = process.env.BUCKET;

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET,
        acl: `public-read`,
        key: (req, file, cb) => {
            cb(null, `Environments/${Date.now()}-${file.originalname}`);
        },
    }),
});

const extractName = (key) => {
    let regex = new RegExp(`^([\\w]+\/)`);
    let filename = key.replace(regex, ``);
    return filename;
};

const uploadEnvironment = (req, res) => {
    let filename = extractName(req.file.key);
    let location = req.file.location;
    res.json({
        message: `Successfully uploaded file`,
        url: location,
        filename: filename,
        statusCode: 201,
    }).status(201);
};

const getEnvironments = (req, res) => {
    s3.listObjectsV2({
        Bucket: BUCKET,
        Prefix: `Environments/`,
        StartAfter: `Environments/`,
    })
        .promise()
        .then((data) => {
            let objects = data.Contents.map((item) => {
                let filename = extractName(item.Key);
                let url = `https://launchpad-mapp3d.s3.ap-southeast-2.amazonaws.com/${item.Key}`;
                let object = { filename: filename, url: url };
                return object;
            });
            res.json({
                message: `Successfully retrieved objects`,
                objectCount: data.Contents.length,
                objects,
                statusCode: 200,
            }).status(200);
        })
        .catch((err) => {
            res.json({
                message: `Failed to get objects`,
                data: err,
                statusCode: 404,
            }).status(404);
        });
};

const downloadEnvironment = (req, res) => {
    const filename = req.params.filename;
    s3.getObject({
        Bucket: BUCKET,
        Key: `Environments/${filename}`,
    })
        .promise()
        .then((file) => {
            res.send(file.Body).status(200);
        })
        .catch((err) => {
            res.json({
                message: err.message,
                statusCode: err.statusCode,
            }).status(404);
        });
};

const deleteEnvironment = (req, res) => {
    const filename = req.params.filename;
    const params = {
        Bucket: BUCKET,
        Key: `Environments/${filename}`,
    };
    s3.headObject(params)
        .promise()
        .then(() => {
            s3.deleteObject(params)
                .promise()
                .then(() => {
                    res.json({
                        message: `Succesfully deleted file`,
                        file: filename,
                        statusCode: 200,
                    }).status(200);
                })
                .catch((err) => {
                    res.json({
                        err,
                    }).status(err.statusCode);
                });
        })
        .catch(() => {
            res.json({
                message: `File does not exist`,
                statusCode: 404,
            }).status(404);
        });
};

const doesExist = (req, res) => {
    const filename = req.params.filename;
    s3.headObject({
        Bucket: BUCKET,
        Key: `Environments/${filename}`,
    })
        .promise()
        .then((data) => {
            res.json({
                message: `File exists`,
                data,
                statusCode: 200,
            }).status(200);
        })
        .catch((err) => {
            res.json({
                message: `Returned: ${err.message}`,
                error: err.code,
                statusCode: err.statusCode,
            }).status(err.statusCode);
        });
};

module.exports = {
    upload,
    uploadEnvironment,
    getEnvironments,
    downloadEnvironment,
    doesExist,
    deleteEnvironment,
};
