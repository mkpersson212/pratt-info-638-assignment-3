const env = process.env.NODE_ENV || 'development'
const credentials = require(`./credentials.${env}`)

//I've had to change the secret key in bookedin.js and 
// create a credentials.development.js,
// because this file wasn't working as entered. 
// This was based off AI recommendation to address the errors
//  I was receiving, but I'm aware that 
// a secret key should not be used this way.

module.exports = { credentials }