const mongoose = require(`mongoose`);
const Models = require('../models');
const express = require('express');
const router = express.Router();
const ProjectControllers = require('../controllers');

router.get('/', (req, res) => {
  ProjectControllers.projectController.getDataController(req, res);
});

router.post('/', (req, res) => {
  ProjectControllers.projectController.uploadDataController(req, res);
});

router.delete('/deleteObject', (req, res) => {
  let obj_id = req.body.obj_id;  
  // updateMany goes through the vrObject array finds a specific record
  Models.VR.updateMany(
    { },
    { $pull: { vrObject: { _id: obj_id } } }
  ).then((record) => {
    if (record) {
      console.log(record);
      let success_message = 'Record deleted';
      res.render('delete', { title: 'Delete Object', success_message });
    } else {
      let error_message = 'Something went wrong!';
      res.render('delete', { title: 'Delete Object', error_message });
    }
  });
});

router.get('/home', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/environments', (req, res) => {
  res.render('environments', { title: 'Environments' });
});
router.get('/myEnvironments', (req, res) => {
  ProjectControllers.projectController.getEnvironmentsController(req, res);
});
router.get('/miami', (req, res) => {
  res.render('miami', { title: 'My Environments' });
});
router.get('/createEnvironment', (req, res) => {
  res.render('createEnvironment', { title: 'Create Environment' });
});
router.get('/environmentLayout', (req, res) => {
  res.render('environmentLayout', { title: 'Environment Layout' });
});
router.get('/editEnvironment', (req, res) => {
  res.render('editEnvironment', { title: 'Edit Environment ' });
});
router.get('/360video', (req, res) => {
  res.render('360video', { title: '360 video' });
});
module.exports = router;
