const db = require('../db');

const User = {
    create: (data, callback) => {
        db.query('insert into users set ?', data, callback);
    },

    findByEmail: (email, callback) => {
        db.query('select * from users where email = ?', [email], callback);
    }
};

module.exports = User;