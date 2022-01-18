module.exports = {
    projectService: require("./projects"),
    s3Object: require(`./object`),
    s3Environment: require(`./environment`),
    dbObjects: require(`./mongoDB/objects`),
    dbEnvironments: require(`./mongoDB/environments`),
};
