'use strict';

const meterService = require('../services/meterService');
const logger = require('../utils/errorHandler')
const schema = require('../schema/meterReaderSchema');
const helper = require('../utils/helper')

module.exports.getMeterReading = (event, context, callback) => {
    let requestBody = JSON.parse(event.body);
    let customerId = requestBody.customerId;
    let serialNumber = requestBody.serialNumber;

    meterService
    .getMeterReading(customerId, serialNumber)
    .then((resp) => {
        if(resp){
            callback(null, helper.createResponse(200, resp));
        }else{
            callback(null, helper.createResponse(404, "Meter reading not found"));
        }
    })
    .catch((err) => {
        logger.logErrors(err);
        callback(null, helper.createResponse(500, err.stack));
    })
}

module.exports.postMeterReading = (event, context, callback) => {
    helper.validateBody(event, schema.meterReaderSchema, (err, body) => {
        if(err){
            callback(null, helper.createResponse(400, JSON.stringify(err))); 
        }
        else{
            meterService
            .saveMeterReading(body)
            .then((resp) => {
                callback(null, helper.createResponse(200, resp));
            })
            .catch((err) => {
                logger.logErrors(err);
                callback(null, helper.createResponse(500, err.stack));
            })
        }
    });
}