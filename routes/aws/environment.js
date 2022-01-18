require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();
const multer = require(`multer`);
const multerS3 = require(`multer-s3`);
const AWS = require(`aws-sdk`);
const path = require("path");

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

// AWS Routes
router.get(`/list`, async (req, res) => {
    let response = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    let key = response.Contents.map((item) => item.Key);
    res.json({
        message: `Success`,
        data: key,
        statusCode: 200,
    }).status(200);
});

router.post(`/upload`, upload.single(`file`), async (req, res, next) => {
    console.log(req.file);
    let location = req.file.location;
    res.json({
        message: `Successfully uploaded file!`,
        data: location,
        statusCode: 200,
    }).status(200);
});

router.get(`/download/:filename`, async (req, res) => {
    const filename = req.params.filename;
    let file = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send(file.Body);
});

router.delete(`/delete/:filename`, async (req, res) => {
    const filename = req.params.filename;
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    res.json({
        message: `Successfully deleted file!`,
        file: filename,
        statusCode: 200,
    }).status(200);
});

module.exports = router;
