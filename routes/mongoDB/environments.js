const express = require(`express`);
const router = express.Router();
const Controllers = require(`../../controllers`);

router.get(`/`, Controllers.Environment.getAllEnvironments);
router.get(`/search/:objectName`, Controllers.Environment.searchEnvironments);
router.get(`/:id`, Controllers.Environment.getEnvironment);
router.post(`/create`, Controllers.Environment.createEnvironment);
router.patch(`/update/:id`, Controllers.Environment.updateEnvironment);
router.delete(`/delete/:id`, Controllers.Environment.deleteEnvironment);
router.delete(`/deleteAll`, Controllers.Environment.deleteAllEnvironments);

module.exports = router;