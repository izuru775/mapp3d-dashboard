const express = require(`express`);
const router = express.Router();
const Controllers = require('../../controllers');

router.get(`/list`, Controllers.S3Environment.getEnvironments);
router.post(`/upload`, Controllers.S3Environment.upload.single(`file`), Controllers.S3Environment.uploadEnvironment);
router.get(`/download/:filename`, Controllers.S3Environment.downloadEnvironment);
router.delete(`/delete/:filename`, Controllers.S3Environment.deleteEnvironment);
router.get(`/exist/:filename`, Controllers.S3Environment.doesExist);

module.exports = router;
