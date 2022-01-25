const mongoose = require(`mongoose`);
const Models = require('../models');

const getDataService=(req,res)=>{
    Models.VR.find({})
    .then((result) => {
      if (result) {
        res.json({ statusCode: 200, data: result });
      } else {
        res.json({ statusCode: 400, message: err });
      }
    })
    .catch((err) => console.log(err));
}

const uploadDataService=(req,res)=>{
  let { environmentName, environmentCreator,environmentOptions, vrObject } = req.body;
  console.log(req.body);
  if (req.body) {
    Models.VR.create({
      environmentName,
      environmentCreator,
      environmentOptions,
      vrObject,
    })
      .then((result) => {
        if (result) {
          res.json({
            statusCode: 200,
            message: "object successfully added",
            data: result,
          });
        } else {
          res.json({ statusCode: 400, message: err });
        }
      })
      .catch((err) => console.log(err));
  }
}
const getEnvironmentsService=(req,res)=>{
  res.render('myEnvironments',{title:'My Environments'})
}
module.exports ={
    getDataService,
    uploadDataService,
    getEnvironmentsService
}