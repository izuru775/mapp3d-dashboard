module.exports = {
    projectService: require("./projects"),
    s3Object: require(`./aws/object`),
    s3Environment: require(`./aws/environment`)
};
