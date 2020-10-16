'use strict';

const mysql = require('mysql');
const Repository = require("../repository/BooksCatalogRepository")

module.exports.handler = async event => {
    const repository = new Repository();
    const id = event.pathParameters.id;

    try {
        const result = await repository.getId(id);
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
}