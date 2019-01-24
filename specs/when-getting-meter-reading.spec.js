const chai = require('chai');
const expect = chai.expect;
const meterReading = require('../handlers/meterReadingHandler');
const sinon = require('sinon');
const meterService = require('../services/meterService')

describe('meterReading', function () {

    describe('getMeterReading', function(){
        let event = {
            "body": '{"customerId": 123, "serialNumber": 456}'
        };
    
        let sinonStub;
    
        beforeEach(function () {
            sinonStub = sinon
            .stub(meterService, 'getMeterReading')
            .withArgs(123, 456)
        });
    
        it('should retrieve meter reading for a customer successfully', function () {
            sinonStub.returns(Promise.resolve('hello world'));
    
            meterReading.getMeterReading(event, sinon.spy(), (err, resp) => {
                expect(resp.body).to.be.equal('hello world');
            });
        });

        it('should return statusCode 404 if reading for a customer successfully', function () {
            sinonStub.returns(Promise.resolve(''));
    
            meterReading.getMeterReading(event, sinon.spy(), (err, resp) => {
                expect(resp.statusCode).to.be.equal(404);
            });
        });
    
        it('should handle exception when getting a meter reading', function () {
            sinonStub.returns(Promise.reject('Error'));
    
            meterReading.getMeterReading(event, sinon.spy(), (err, resp) => {
                expect(resp.statusCode).to.be.equal(500);
            });
        });
    
        afterEach(function(){
            sinon.restore();
        })
    })
});