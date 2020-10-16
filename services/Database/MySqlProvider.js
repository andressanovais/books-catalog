'use strict';

const mysql = require("mysql");
const ParameterStore = require("../ParameterStore/ParameterStoreServices");

module.exports = class MySqlProvider {

     /**
  * @description cria a conexão com o banco de dados
  * */
    async init() {
        try {
            const mySqlCredentials = await ParameterStore.mySqlCredentials();
            this.connection = mysql.createConnection({
                database: "library",
                ...mySqlCredentials
            });
        } catch (err) {
            console.log(err);
        }
    }

    query(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (queryErr, queryResults) => {
                if (queryErr) {
                    reject(queryErr);
                } 
                resolve(queryResults);
            });
        });
    }

    escape(query, params) {
        return mysql.format(query, params);
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    reject(err);
                }

                resolve();
            })
        })
    }

}