'use strict';

module.exports.getBook = async event => {
    const mysql = require('mysql');
  
    const connection = mysql.createConnection({
        host: "library.cvk7wdoihidr.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "la4la7la3",
        database: "library"
    });
    
    const id = event.pathParameters.id;
    console.log(`id a ser buscado: ${id}`);

    const getQuery = function() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM livros WHERE book = ${id}`, function(err, results) {
            if (!results.length) reject("id not found.");
            if (err) reject(err);
            
            resolve(results);
            });
        })
    }

    try {
        const result = await getQuery();

        return {
        statusCode: 200,
        body: JSON.stringify({ results: result })
        };
    } catch (err) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: err })
    };
  }
};