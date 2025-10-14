const Product = require('../models/Product');

exports.getAllProducts = (req, res) => {
    Product.getAll((err, results) => {
        if(err) return res.status(500).json({message: err});
        res.json(results);
    });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;

  Product.getById(id, (err, results) => {
    if (err) return res.status(500).json({ message: err });
    if (results.length === 0) return res.status(404).json({ message: 'Not Found' });
    res.json(results[0]);
  });
};

exports.createProduct = (req, res) => {
    const data = req.body;

    Product.create(data, (err, result) => {
        if(err) return res.status(500).json({message: err});
        res.status(201).json({ id: result.insertId, ...data});
    });
};

exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    Product.update(id,data, (err, results) => {
        if(err) return res.status(500).json({message: err});
        res.json({message: 'Updated Successful', id: id, ...data});
    });
};

exports.deleteProduct = (req, res) => {
    const id = req.params.id;

    Product.delete(id, (err, results) => {
        if(err) return res.status(500).json({message: err});
        res.json({message: 'Deleted Successful', id: id});
    });
};