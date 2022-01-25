const VR = require("../models/3dmodel");
const express = require("express");
const router = express.Router();
const ProjectControllers = require("../controllers");

router.get("/", (req, res) => {
  ProjectControllers.projectController.getDataController(req,res)
  
});

router.post("/", (req, res) => {
  ProjectControllers.projectController.uploadDataController(req,res)
  
});

router.get("/home", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get('/environments',(req,res)=>{
    res.render('environments',{title:'Environments'})
})
router.get('/myEnvironments',(req,res)=>{
  ProjectControllers.projectController.getEnvironmentsController(req,res)
    
})
router.get('/miami',(req,res)=>{
    res.render('miami',{title:'My Environments'})
})
router.get('/createEnvironment',(req,res)=>{
    res.render('createEnvironment',{title:'Create Environment'})
})
router.get('/environmentLayout',(req,res)=>{
    res.render('environmentLayout',{title:'Environment Layout'})
})
router.get('/editEnvironment',(req,res)=>{
    res.render('editEnvironment',{title:'Edit Environment '})
})
router.get('/360video',(req,res)=>{
    res.render('360video',{title:'360 video'})
})
module.exports = router;

