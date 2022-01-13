const mongoose = require(`mongoose`);
const Models = require(`../models`);

const createObject = (req, res) => {
    let objectData = req.body;
    Models.Object.create(objectData, (err, data) => {
        if (err) {
            res.json({ message: err.message, statusCode: 400 }).status(400);
        } else {
            res.json({ message: `Successfully created`, data: data, statusCode: 201 }).status(201);
        }
    });
};

const getAllObjects = (req, res) => {
    Models.Object.find((err, objects) => {
        if (err) {
            res.json({ message: err.message, statusCode: 400 }).status(400);
        } else {
            res.json({
                message: `Successfully retreived objects`,
                data: objects,
                statusCode: 200,
            }).status(200);
        }
    });
};

const getNamedObjects = (req, res) => {
    let objectName = req.body.objectName;
    Models.Object.find({ objectName: objectName }, (err, objects) => {
        if (err) {
            res.json({ message: err.message, statusCode: 404 }).status(404);
        } else {
            res.json({
                message: `Successfully retrieved objects named: ${objectName}`,
                data: objects,
                statusCode: 200,
            }).status(200);
        }
    });
};

const getObject = (req, res) => {
    let objectID = req.body.id;
    Models.Object.findOne({ _id: objectID }, (err, object) => {
        if (err) {
            res.json({ message: err.message, statusCode: 404 }).status(404);
        } else {
            res.json({
                message: `Succesfully found object with ID: ${objectID}`,
                data: object,
                statusCode: 200,
            }).status(200);
        }
    });
};

const updateObject = (req, res) => {
    let objectID = req.body.id;
    let data = req.body;
    Models.Object.findByIdAndUpdate(objectID, { $set: data }, (err, object) => {
        if (err) {
            res.json({
                message: err.message,
                statusCode: 400,
            }).status(400);
        } else {
            res.json({
                message: `Successfully updated object!`,
                updated: data,
                original: object,
            }).status(200);
        }
    });
};

const deleteObject = (req, res) => {
    let objectID = req.body.id;
    Models.Object.findByIdAndDelete(objectID, (err, data) => {
        if (err) {
            res.json({
                message: err.message,
                statusCode: 404,
            }).status(404);
        } else {
            res.json({
                message: `Successfully deleted object: ${objectID}`,
                data: data,
                statusCode: 200,
            }).status(200);
        }
    });
};

const deleteAllObjects = (req, res) => {
    Models.Object.deleteMany((err, data) => {
        if (err) {
            res.json({
                message: err.message,
                statusCode: 404,
            }).status(404);
        } else {
            res.json({
                message: `Successfully deleted all objects`,
                data: data,
                statusCode: 200,
            }).status(200);
        }
    });
};

module.exports = {
    createObject,
    getNamedObjects,
    getAllObjects,
    getObject,
    updateObject,
    deleteObject,
    deleteAllObjects,
};
