const Services= require('../services')

const getDataController=(req,res)=>{
    Services.projectService.getDataService(req,res)
    
}

module.exports = {
    getDataController
}