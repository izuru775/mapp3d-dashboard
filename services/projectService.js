const VR = require('../models/3dmodel');

const getDataService=(req,res)=>{
    VR.find({})
    .then((result) => {
      if (result) {
        res.json({ statusCode: 200, data: result });
      } else {
        res.json({ statusCode: 400, message: err });
      }
    })
    .catch((err) => console.log(err));
}

module.exports ={
    getDataService
}