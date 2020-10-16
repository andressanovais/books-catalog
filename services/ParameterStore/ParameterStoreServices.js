'use strict';
const aws = require("aws-sdk");
const { REGION } = require("../configuration")

aws.config.update({ region: REGION });

module.exports = class ParameterStoreServices {
    
    static getInfosFromSSM(path){
        return new Promise((resolve, reject) => {
            const ssm = new aws.ssm({region: REGION});
            const params = {
                Name: `/bookscatalog-dev/Databases/${path}`,
                WithDecryption: false
            };
            
            ssm.getParameter(params, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data.Parameter.Value);
            });
        });
    }

    static mySqlCredentials() {
        return new Promise((resolve, reject) => {
            try {
                const connectionString = await getInfosFromSSM("MySQLCredentials");
                resolve(JSON.parse(connectionString));
            } catch (err) {
                reject(err);
            }
        });
    }
}