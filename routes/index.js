module.exports = {
    projectService: require("./projects"),
    AWS: require(`./aws`),
    dbObjects: require(`./mongoDB/objects`),
    dbEnvironments: require(`./mongoDB/environments`),
};
