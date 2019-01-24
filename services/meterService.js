'use strict'

var jokeCache = require('memory-cache');

module.exports.getMeterReading = (customerId, serialNumber) => {
    return new Promise(function(resolve, reject){
        try{
            let key = `${customerId}-${serialNumber}`;
            let reading = jokeCache.get(key);

            resolve(reading);
        }
        catch(e){
            reject(e);
        }
    })
}

module.exports.saveMeterReading = (meterReading) => {
    return new Promise(function(resolve, reject){
        try{
            let key = `${meterReading.customerId}-${meterReading.serialNumber}`;
            jokeCache.put(key, meterReading);

            resolve(meterReading);
        }
        catch(e){
            reject(e);
        }
    })
}