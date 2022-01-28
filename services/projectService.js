const mongoose = require(`mongoose`);
const Models = require('../models');

const getDataService = (req, res) => {
  Models.VR.find({})
    .then((result) => {
      if (result) {
        res.json({ statusCode: 200, data: result });
      } else {
        res.json({ statusCode: 400, message: err });
      }
    })
    .catch((err) => console.log(err));
};

const uploadDataService = (req, res) => {
  let { environmentName, environmentCreator, environmentOptions, vrObject } =
    req.body;
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
            message: 'object successfully added',
            data: result,
          });
        } else {
          res.json({ statusCode: 400, message: err });
        }
      })
      .catch((err) => console.log(err));
  }
};
const getEnvironmentService = (req, res) => {
  Models.VR.find({})
    .then((result) => {
      if (result) {
        res.render('myEnvironments', { title: 'My Environments' ,records:result});
      } else {
        res.json({ statusCode: 400, message: err });
      }
    })
    .catch((err) => console.log(err));
};
  

const deleteObjectsService = (req, res) => {
  let obj_id = req.body.obj_id;

  // UpdateMany goes through the vrObject array to finds a specific record
  Models.VR.updateMany({}, { $pull: { vrObject: { _id: obj_id } } })
    .then((record) => {
      let err = 'record not fund';

      if (record.modifiedCount) {
        let success_message = '3dObject successfully deleted';
        res.json({
          statusCode: 200,
          message: success_message,
          data: record,
        });
      } else {
        res.json({ statusCode: 400, message: err });
      }
    })
    .catch((err) => console.log(err));
};
const deleteEnvironmentService = (req, res) => {
  const env_id = req.body.id;
  Models.VR.findByIdAndDelete({ _id: env_id })
    .then((record) => {
      let err = 'record not fund';
      let success_message = '3dObject successfully deleted';
      if (record) {
        res.json({
          statusCode: 200,
          message: success_message,
          data: record,
        });
      } else {
        res.json({ statusCode: 400, message: err });
      }
    })
    .catch((err) => console.log(err));
};

const updateEnvironmentService = (req, res) => {
  const {
    id,
    environmentName,
    environmentCreator,
    environmentOptions,
    vrObject,
  } = req.body;
  Models.VR.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        environmentName,
        environmentCreator,
        environmentOptions,
        vrObject,
      },
    }
  )
    .then((result) => {
      let err = 'record not fund';
      let success_message = 'Environment successfully deleted';
      if (result) {
        res.json({
          statusCode: 200,
          message: success_message,
          data: result,
        });
      } else {
        res.json({ statusCode: 400, message: err });
      }
    })
    .catch((err) => console.log(err));
};

const addObjectsService = (req, res) => {

  const { id, vrObject } = req.body;
  Models.VR.findByIdAndUpdate({ _id: id }, { $push: { vrObject: vrObject } })
    .then((result) => {
      let err = 'something went wrong!';
      let success_message = 'Object successfully added';
      if (result) {
        res.json({
          statusCode: 200,
          message: success_message,
          data: result,
        });
      } else {
        res.json({ statusCode: 400, message: err });
      }
    })
    .catch((err) => console.log(err));
};
module.exports = {
  getDataService,
  uploadDataService,
  getEnvironmentService,
  deleteObjectsService,
  deleteEnvironmentService,
  updateEnvironmentService,
  addObjectsService,
};
