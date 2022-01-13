const VR = require('../models/3dmodel');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    VR.find({}).
        then(result=>{
            if(result){
                res.json({statusCode:200,data:result})
            }else{
                res.json({statusCode:400,message:err})
            }
        })
        .catch(err=>console.log(err))
})

router.post('/',(req,res)=>{
    let {environmentName,environmentCreator,vrObject} = req.body;
    console.log(req.body);
    if(req.body){
        const newVR = new VR({
            environmentName,
            environmentCreator,
            vrObject
        })
        newVR.save()
        .then(result =>{
            if(result){
                res.json({statusCode:200,message:"object successfully added", data:result})
            }else{
                res.json({statusCode:400,message:err})
            }
        })
        .catch(err=>console.log(err));
    }
    
    
});

router.get('/home',(req,res)=>{
    res.render('index',{title:"Home"})
})

router.get('/environments',(req,res)=>{
    res.render('environments',{title:'Environments'})
})
router.get('/myEnvironments',(req,res)=>{
    res.render('myEnvironments',{title:'My Environments'})
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

