const express = require(`express`);
const router = express.Router();
const Controllers = require(`../controllers`);

router.get(`/`, Controllers.Object.getAllObjects);
router.get(`/objects/:objectName`, Controllers.Object.getNamedObjects);
router.get(`/object/:id`, Controllers.Object.getObject);
router.post(`/create`, Controllers.Object.createObject);
router.patch(`/update/:id`, Controllers.Object.updateObject);
router.delete(`/delete/:id`, Controllers.Object.deleteObject);
router.delete(`/deleteAll`, Controllers.Object.deleteAllObjects);

module.exports = router;