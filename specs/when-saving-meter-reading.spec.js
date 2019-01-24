const chai = require('chai');
const expect = chai.expect;
const meterReading = require('../handlers/meterReadingHandler');
const sinon = require('sinon');
const meterService = require('../services/meterService')

describe('meterReading', function () {

    describe('postMeterReading', function(){

        let body = {
            "customerId": "identifier123",
            "serialNumber": "27263927192",
            "MPXN": "14582749",
            "read": [
                {"type": "ANYTIME", "registerId": "387373", "value": "2729"},
                {"type": "NIGHT", "registerId": "387373", "value": "2892"}
            ],
            "readDate": "2017-11-20T16:19:48+00:00Z"
        };

        //Without customer id
        let invalidBody = {
            "serialNumber": "27263927192",
            "MPXN": "14582749",
            "read": [
                {"type": "ANYTIME", "registerId": "387373", "value": "2729"},
                {"type": "NIGHT", "registerId": "387373", "value": "2892"}
            ],
            "readDate": "2017-11-20T16:19:48+00:00Z"
        };

        let event = { "body": "" };
        let sinonStub;
    
        beforeEach(function () {
            event.body = JSON.stringify(body);

            sinonStub = sinon
            .stub(meterService, 'saveMeterReading')
            .withArgs(JSON.parse(event.body))
        });

        it('Should post meter reading successfully', function(){
            sinonStub.returns(Promise.resolve('hello world'));

            meterReading.postMeterReading(event, sinon.spy(), (err, resp) => {
                expect(resp.body).to.be.equal('hello world');
            })
        })

        it('Should return bad request status if json schema is invalid', function(){
            event.body = JSON.stringify(invalidBody);

            meterReading.postMeterReading(event, sinon.spy(), (err, resp) => {
                expect(resp.statusCode).to.be.equal(400);
            })
        })

        it('should handle exception when saving a meter reading', function () {
            sinonStub.returns(Promise.reject('Error'));

            meterReading.postMeterReading(event, sinon.spy(), (err, resp) => {
                expect(resp.statusCode).to.be.equal(500);
            });
        });

        afterEach(function(){
            sinon.restore();
        })
    })

});