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

const deleteObjectsController=(req,res)=>{
    Services.projectService.deleteObjectsService(req,res)
}

const deleteEnvironmentController=(req,res)=>{
    Services.projectService.deleteEnvironmentService(req,res)
}
const updateEnvironmentController =(req,res)=>{
    Services.projectService.updateEnvironmentService(req,res)
}
module.exports = {
    getDataController,
    uploadDataController,
    getEnvironmentsController,
    deleteObjectsController,
    deleteEnvironmentController,
    updateEnvironmentController,
}