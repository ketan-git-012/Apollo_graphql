const dotenv = require('dotenv');

dotenv.config();

const configApp = {
    server : {
        PORT : process.env.PORT,
        serviceURL : process.env.serviceURL
    }
};

module.exports = configApp;