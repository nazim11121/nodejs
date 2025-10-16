const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { json } = require('body-parser');

exports.register = (req, res) =>{
    const {name, email, password} =req.body;

    if(!name || !email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }

    User.findByEmail(email, (err, results) =>{
        if(results.length>0){
            return res.status(409).json({message: 'Email already exists'});
        }
    });

    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = bcrypt.hashSync(password, 8);
    User.create({name, email, password: hashedPassword}, (err, results) => {
        if(err) return res.status(500).json({message: err});
        res.status(201).json({id: results.insertId, name, email});
    });
};

exports.login = (req, res) => {
    const {email, password} = req.body;

    if(!email || !password)
        return res.status(400).json({message: 'All fields are required'});

    User.findByEmail(email, async(err, results) => {
        if(results.length === 0)
            return res.status(401).json({message: 'Invalid email or password'});

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
            return res.status(401).json({message: 'Invalid email or password'});

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({
            message: 'Login successful',
            token,
            user: {id: user.id, name: user.name, email: user.email},
        });
    });
};