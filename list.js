'use strict';
const mysql = require('mysql');

module.exports.listBooks = async event => {

  const connection = mysql.createConnection({
    host: "library.cvk7wdoihidr.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "la4la7la3",
    database: "library"
  });

  const getQuery = function() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM books", function(err, results) {
          if (err) {
            reject(err);
          }
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
    }
  }
};