const mongoose = require(`mongoose`);
const Models = require('../models');
const express = require('express');
const router = express.Router();
const ProjectControllers = require('../controllers');

/**
 * @swagger
 * components:
 *  schemas:
 *    VRSchema:
 *      type: object
 *      required:
 *        -environmentName
 *        -environmentCreator
 *      properties:
 *        environmentName:
 *          type: string
 *          description: Name of the environment
 *        environmentCreator:
 *          type: string
 *          description: Name of the creator
 *        environmentOptions:
 *          type: object
 *          properties:
 *            panorama:
 *              type: boolean
 *              description: A boolean value
 *            preset:
 *              type: string
 *              description: Preset environments
 *            video:
 *              type: string
 *              description: Contains url for the video asset
 *            floorAsset:
 *              type: object
 *              properties:
 *                color:
 *                  type: string
 *                  description: Color of the floor
 *                url:
 *                  type: string
 *                  description: Contains an image asset for the floor
 *            skyAsset:
 *              type: object
 *              properties:
 *                color:
 *                  type: string
 *                  description: Color for the sky
 *                url:
 *                  type: string
 *                  description: 360 image url for the sky
 *        vrObject:
 *          type: array
 *          items:
 *            type: object          
 *            properties:
 *              name:
 *                type: string
 *                description: Name of the vrObject
 *              position:
 *                type: string
 *                description: position of the vrObject
 *              scale:
 *                type: string
 *                description: determines the size of the vrObject
 *              rotation:
 *                type: string
 *                description: determines the rotation of the vrObject
 *              url:
 *                type: string
 *                description: url of the 3dObject
 *
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Environments
 *    description: The environment managing Api 
 */

/**
 * @swagger
 * /api:
 *  get:
 *    summary: Returns all the environments
 *    tags: [GetEnvironments]
 *    responses:
 *      200:
 *        description: The list of the environments
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/VRSchema'
 *      400:
 *        description: invalid request
 */

router.get('/', (req, res) => {
  ProjectControllers.projectController.getDataController(req, res);
});
/**
 * @swagger
 * /api:
 *  post:
 *    summary: Create a new environment 
 *    tags: [CreateEnvironments]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/VRSchema'
 *    responses:
 *      200:
 *        description: The environment was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VRSchema'
 *      500:
 *        description: some server error
 */
router.post('/', (req, res) => {
  ProjectControllers.projectController.uploadDataController(req, res);
});
router.put('/updateEnvironment', (req, res) => {
  ProjectControllers.projectController.updateEnvironmentController(req, res);
});

router.delete('/deleteObject', (req, res) => {
  ProjectControllers.projectController.deleteObjectsController(req, res);
});

router.delete('/deleteEnvironment', (req, res) => {
  ProjectControllers.projectController.deleteEnvironmentController(req, res);
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
