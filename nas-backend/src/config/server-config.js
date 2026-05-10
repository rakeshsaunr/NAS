const dotenv = require('dotenv')
dotenv.config()


module.exports = {
    PORT : process.env.PORT,
    MONGODB_CONNECTION_STRING : 'mongodb://localhost:27017'
}