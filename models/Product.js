const db = require('../db');

const Product = {
    getAll: (callback) => {
        db.query('select * from products', callback);
    },
    getById: (id, callback) =>{
        db.query('select * from products where id = ?', [id],callback);
    },
    craete: (data, callback) =>{
        db.query('insert into products set ?', data,callback);
    },
    update: (id,data, callback) =>{
        db.query('update products set ? where id = ?', [data,id],callback);
    },
    delete: (id, callback) =>{
        db.query('delete from products where id = ?', [id],callback);
    },
};

module.exports = Product;