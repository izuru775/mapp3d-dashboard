require(`dotenv`).config();
global.fetch = require(`node-fetch`);
global.navigator = () => null;
const AmazonCognitoIdentity = require(`amazon-cognito-identity-js`);

const poolData = {
    UserPoolId: process.env.POOL_ID,
    ClientId: process.env.CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const Register = (req, res) => {
    attributeList = [];
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let dataName = {
        Name: `name`,
        Value: name,
    };

    let dataEmail = {
        Name: `email`,
        Value: email,
    };

    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataName));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail));

    userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
            // alert(err.message || JSON.stringify(err));
            res.json({
                message: `Error`,
                data: err,
            }).status(400);
            return;
        } else {
            let cognitoUser = result.user;
            res.json({
                message: `Successfully registered`,
                user: result.user.username,
            }).status(201);
            console.log(`Successfully registered`);
            console.log(`Username is: ${cognitoUser.getUsername()}`);
        }
    });
};

const Login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let authenticationData = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password,
    });

    let userData = {
        Username: email,
        Pool: userPool,
    };

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationData, {
        onSuccess: (result) => {
            let accessToken = result.getAccessToken().getJwtToken();
            let idToken = result.getIdToken().getJwtToken();
            var refreshToken = result.getRefreshToken().getToken();
            res(null, {
                accessToken: accessToken,
                idToken: idToken,
                refreshToken: refreshToken,
            });
            res.json({
                message: `Successfully authenticated`,
                data: result,
            });
        },
        onFailure: (err) => {
            res.json({
                message: `Error`,
                data: err,
            });
        },
    });
};

const Validate = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
};

module.exports = {
    Register,
    Login,
    Validate,
};
