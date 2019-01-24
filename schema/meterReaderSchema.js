'use strict'

module.exports.meterReaderSchema = {
    "id": "/meterReader",
    "type": "object",
    "properties": {
        "customerId": {"type": "string"},
        "serialNumber": {"type": "string"},
        "MPXN": {"type": "string"},
        "read": {"type": "array"},
        "readDate": {"type": "string"}
    },
    "required": ["customerId", "serialNumber", "MPXN"],
    "additionalProperties": false
}