const express = require(`express`);
const router = express.Router();
const Controllers = require(`../controllers`);

router.post(`/register`, Controllers.User.Register);
router.post(`/login`, Controllers.User.Login);

module.exports = router;