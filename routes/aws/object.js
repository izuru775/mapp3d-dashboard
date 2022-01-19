const express = require(`express`);
const router = express.Router();
const Controllers = require('../../controllers');

router.get(`/list`, Controllers.S3Object.getObjects);
router.post(`/upload`, Controllers.S3Object.upload.single(`file`), Controllers.S3Object.uploadObject);
router.get(`/download/:filename`, Controllers.S3Object.downloadObject);
router.delete(`/delete/:filename`, Controllers.S3Object.deleteObject);
router.get(`/exist/:filename`, Controllers.S3Object.doesExist);

module.exports = router;
