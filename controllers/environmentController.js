const mongoose = require(`mongoose`);
const Models = require(`../models`);

const createEnvironment = (req, res) => {
    let environmentData = req.body;
    Models.Environment.create(environmentData, (err, data) => {
        if (err) {
            res.json({
                message: err.message,
                statusCode: 400,
            }).status(400);
        } else {
            res.json({
                message: `Successfully created environment`,
                data: data,
                statusCode: 201,
            }).status(201);
        }
    });
};

const getAllEnvironments = (req, res) => {
    Models.Environment.find((err, environments) => {
        if (err) {
            res.json({
                message: err.message,
                statusCode: 400,
            }).status(400);
        } else {
            res.json({
                message: `Retreived all environments`,
                data: environments,
                statusCode: 200,
            }).status(200);
        }
    });
};

const searchEnvironments = (req, res) => {
    let environmentName = req.params.environmentName;
    Models.Environment.find({ environmentName: environmentName }, (err, environments) => {
        if (err) {
            res.json({
                message: err.message,
                statusCode: 404,
            }).status(404);
        } else {
            res.json({
                message: `Retrieved environments named: ${environmentName}`,
                count: environments.length,
                data: environments,
                statusCode: 200,
            }).status(200);
        }
    });
};

const getEnvironment = (req, res) => {
    let environmentID = req.params.id;
    Models.Environment.findOne({ _id: environmentID }, (err, environment) => {
        if (err) {
            res.json({
                message: err.message,
                statusCode: 404,
            }).status(404);
        } else {
            res.json({
                message: `Found environment with ID: ${environmentID}`,
                data: environment,
                statusCode: 200,
            }).status(200);
        }
    });
};

const updateEnvironment = (req, res) => {
    let environmentID = req.params.id;
    let data = req.body;
    Models.Environment.findByIdAndUpdate(environmentID, { $set: data }, (err, environment) => {
        if (err) {
            res.json({
                message: err.message,
                statusCode: 400,
            }).status(400);
        } else {
            res.json({
                message: `Successfully updated environment!`,
                updated: data,
                original: environment,
            }).status(200);
        }
    });
};

const deleteEnvironment = (req, res) => {
    let environmentID = req.params.id;
    Models.Environment.findByIdAndDelete(environmentID, (err, data) => {
        if (err) {
            res.json({
                message: err.message,
                statusCode: 404,
            }).status(404);
        } else {
            res.json({
                message: `Successfully deleted environment: ${environmentID}`,
                data: data,
                statusCode: 200,
            }).status(200);
        }
    });
};

const deleteAllEnvironments = (req, res) => {
    Models.Environment.deleteMany((err, data) => {
        if (err) {
            res.json({
                message: err.message,
                statusCode: 404,
            }).status(404);
        } else {
            res.json({
                message: `Successfully deleted all environments`,
                data: data,
                statusCode: 200,
            }).status(200);
        }
    });
};

module.exports = {
    createEnvironment,
    searchEnvironments,
    getAllEnvironments,
    getEnvironment,
    updateEnvironment,
    deleteEnvironment,
    deleteAllEnvironments,
};
