'use strict'

const validator = require('jsonschema').Validator;
const jsonValidator = new validator();

module.exports.createResponse = (errorCode, message) => {
    let response = {
        statusCode: errorCode,
        body: message,
    };

    return response;
}

module.exports.validateBody = (event, schema, fn) => {
    var requestBody = JSON.parse(event.body);
    let validationResults = jsonValidator.validate(requestBody, schema);

    if(validationResults.errors.length > 0){
        fn(validationResults.errors, null);
    }
    else{
        fn(null, requestBody);
    }
}