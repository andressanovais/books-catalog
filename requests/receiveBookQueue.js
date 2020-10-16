'use strict';
const aws = require("aws-sdk");
const Repository = require("../repository/BooksCatalogRepository");

module.exports.handler = async (event) => {
    const repository = new Repository();
    const book = JSON.parse(event.Records[0].body);
    
    try {
        await repository.createBook(book);
        console.log("Book successfully inserted in DB.");
    } catch (err) {
        console.log(err);
    }
}
