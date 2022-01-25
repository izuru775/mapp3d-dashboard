const Services = require('../services')

const getDataController=(req,res)=>{
    Services.projectService.getDataService(req,res)
    
}

const uploadDataController =(req,res)=>{
    Services.projectService.uploadDataService(req,res)
}

const getEnvironmentsController =(req,res)=>{
    Services.projectService.getEnvironmentService(req,res)
}

module.exports = {
    getDataController,
    uploadDataController,
    getEnvironmentsController
}