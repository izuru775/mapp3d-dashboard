module.exports ={
    projectController:require('./projectControllers'),
    Object: require('./objectController'),
    Environment: require('./environmentController'),
    S3Object: require('./s3ObjectController'),
    S3Environment: require(`./s3EnvironmentController`),
}