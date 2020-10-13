'use strict';

module.exports.newBook = async (event) => {
    const mysql = require('mysql');
    
    const connection = mysql.createConnection({
        host: "library.cvk7wdoihidr.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "la4la7la3",
        database: "library"
    });

    const newBook = JSON.parse(event.Records[0].body);
    const addBookDB = function() {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO books (title, author, publisher, ' +
                'publicationYear) VALUES ("' + newBook.title + '", "' + newBook.author + '", "' + 
                newBook.publisher + '", "' + newBook.publicationYear + '")', function(err) {
            if (err) {
                reject(err);
            }
            resolve("Success");
            });
        })
    }

    try {
        const result = await addBookDB();
        console.log("Book successfully inserted in DB.");
    } catch (err) {
        console.log(`Error inserting book in DB. ${err}`);
    }
}
