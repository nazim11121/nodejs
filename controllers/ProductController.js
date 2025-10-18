const Product = require('../models/Product');

exports.getAllProducts = (req, res) => {
    Product.getAll((err, results) => {
        if(err) return res.status(500).json({message: err});
        // res.json(results);
        // Return full image URL
        const updated = results.map((p) => ({
        ...p,
        image_url: p.image ? `${req.protocol}://${req.get('host')}/uploads/${p.image}` : null,
        }));
        res.json(updated);
    });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;

  Product.getById(id, (err, results) => {
    if (err) return res.status(500).json({ message: err });
    if (results.length === 0) return res.status(404).json({ message: 'Not Found' });
    // res.json(results[0]);
    const product = results[0];
    product.image_url = product.image
      ? `${req.protocol}://${req.get('host')}/uploads/${product.image}`
      : null;
    res.json(product);
  });
};

exports.createProduct = (req, res) => {
    const data = req.body;
    if (req.file) {
        data.image = req.file.filename;
    }

    Product.create(data, (err, result) => {
        if(err) return res.status(500).json({message: err});
        res.status(201).json({ id: result.insertId, ...data});
    });
};

exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (req.file) {
        data.image = req.file.filename;
    }

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