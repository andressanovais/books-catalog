'use strict';

const MySqlProvider = require("../services/Database/MySqlProvider");

module.exports = class BooksCatalogRepository {
    constructor() {
        this.QUERY_GET_TOTAL  = `SELECT * FROM books`;
        
        this.QUERY_GET_ID = `SELECT * from books
        WHERE ID = ?`

        this.QUERY_CREATE_BOOK = `INSERT INTO books SET 
        title = ?,
        author = ?,
        publisher = ?,
        publicationYear = ?
        `;
    }

    getTotal() {
        return new Promise((resolve, reject) => {
            const mySqlProvider = new MySqlProvider();
            try {
                await mySqlProvider.init();
                
                const queryResults = await mySqlProvider.query(this.QUERY_GET_TOTAL);
                mySqlProvider.close();
                return resolve(queryResults);
            } catch (queryError) {
                return reject(queryError);
            }
        });
    }

    getId(id) {
        return new Promise((resolve, reject) => {
            const mySqlProvider = new MySqlProvider();
            try {
                await mySqlProvider.init();
                
                const query = mySqlProvider.escape(this.QUERY_GET_ID, id);
                const results = await mySqlProvider.query(query);
                mySqlProvider.close();
                return resolve(results);
            } catch (err) {
                return reject(err);
            }
        });
    }

    createBook({ 
        title, author, publisher, publicationYear
    }) {
        return new Promise((resolve, reject) => {
            const mySqlProvider = new MySqlProvider();
            try {
                await mySqlProvider.init();
                
                const query = mySqlProvider.escape(this.QUERY_CREATE_BOOK, [
                    title, 
                    author, 
                    publisher, 
                    publicationYear
                ]);
                const results = await mySqlProvider.query(query);
                mySqlProvider.close();
                return resolve(results);
            } catch (err) {
                return reject(err);
            }
        });
    }
}