'use strict';
const aws = require("aws-sdk");
const SQSService = require("../services/SQS/SQSServices")

module.exports.handler = async (event) => {
    const sqs = new SQSService();

    try {
       const queueInsertionResult = await sqs.insertBook(event.body);

       return {
        statusCode: 201,
        body: JSON.stringify({ results: "Book successfully inserted in queue." })
        };
    } catch (insertionError) {
        return {
            statusCode: 500,
            body: JSON.stringify({ insertionError })
        };
    }
}
