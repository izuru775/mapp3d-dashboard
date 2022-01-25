module.exports = {
    projectService: require("./projects"),
    s3Object: require(`./aws/object`),
    s3Environment: require(`./aws/environment`),
    dbObjects: require(`./mongoDB/objects`),
    dbEnvironments: require(`./mongoDB/environments`),
    user: require(`./user`),
};
