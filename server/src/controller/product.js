const mongoose = require('mongoose');
const google_storage = require('config/google_cloud_storage');
const moment = require('moment');

const Product_Model = require('src/models/product');

exports.get_all_products = (req,res) => {
    Product_Model.find()
        .exec()
        .then(products => {
            const response = {
                count: products.length,
                product: products.map(product => {
                    return {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image_url: product.image_url,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3001/products/' + product._id
                        }
                    }
                })
            }
            res.status(201).json(response)
        })
        .catch(err => res.status(500).json({ error: err }))
}
exports.get_product = (req,res) => {
    const id = req.params.product_id;
    Product_Model.findById(id)
        .select('name price image_url')
        .exec()
        .then(product => res.status(200).json(product))
        .catch(err => res.status(500).json({ error: err }))
}
exports.create_product = (req,res) => {
    const product_id = mongoose.Types.ObjectId();
    if (req.file) {
        const product_file_name = product_id + '_' + moment().format();
        const product_storage = google_storage.bucket('test_project_duy');
        const product_file = product_storage.file(product_file_name);
        const upload_image_product = product_file.createWriteStream({
            resumable: false,
            contentType: req.file.mimetype,
        })
        var product_public_url = `https://storage.googleapis.com/${product_storage.name}/${product_file.name}`;
        upload_image_product.end(req.file.buffer);
    }
    const product = new Product_Model({
        _id: product_id,
        name: req.body.name,
        price: req.body.price,
        image_url: product_public_url
    })
    product.save()
        .then((result) => {
            res.status(201).json(result)
        })
        .catch(err => res.status(500).json({ error: err }))
}
exports.update_product = (req,res) => {
    const id = req.params.product_id;
    Product_Model.updateOne({ _id: id }, { $set: { name: req.body.name, price: req.body.price } })
        .exec()
        .then(result => {
            res.send(200).json(result)
        })
        .catch(err => res.status(500).json({ error: err }))
}
exports.delete_product = (req,res) => {
    Product_Model.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => res.status(500).json({ error: err }))
}