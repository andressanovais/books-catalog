'use strict';

const { REGION } = require("../../configuration");
const aws = require("aws-sdk");

module.exports = class SQSServices {
    constructor () {
        this.SQS_URL = process.env.INVOKE_SQS_URL;
    }

 /**
  * @description insere um novo livro na fila
  * @param {object} body - dados do livro
  * @returns {object} informacoes a respeito da insercao
  * */
insertBook(body){
    return new Promise((resolve, reject) => {
        aws.config.update({ region: REGION });
        const sqs = new aws.SQS({apiVersion: '2012-11-05'});
        const params = {
            MessageBody: body,
            QueueUrl: this.SQS_URL 
        };

        try {
            const result = sqs.sendMessage(params).promise();
            return resolve(result);
        } catch (err) {
            return reject(err);
        }
    });
}

}