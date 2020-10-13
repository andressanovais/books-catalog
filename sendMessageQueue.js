'use strict';

module.exports.newBook = async (event) => {
    const aws = require('aws-sdk');
    aws.config.update({region: 'us-east-1'});

    const sqs = new aws.SQS({apiVersion: '2012-11-05'});

    const bookData = JSON.parse(event.body);
    
    const params = {
        MessageAttributes: {
            "title": {
                DataType: "String",
                StringValue: bookData.title
            },
            "author": {
                DataType: "String",
                StringValue: bookData.author
            },
            "publisher": {
                DataType: "String",
                StringValue: bookData.publisher
            },
            "publicationYear": {
                DataType: "String",
                StringValue: bookData.publicationYear
            }
        },
        MessageBody: JSON.stringify(bookData),
        QueueUrl: "https://sqs.us-east-1.amazonaws.com/589322762862/books-to-register"
      };

    try { 
        const sqsSendMessage = await sqs.sendMessage(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({ results: "Book successfully inserted." })
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err })
        };
    }
};
