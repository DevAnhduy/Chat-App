const Order_Model = require('../models/order');
const Product_Model = require('../models/product');
const mongoose = require('mongoose');

exports.get_all_orders = (req, res) => {
    Order_Model.find()
        .populate('product')
        .exec()
        .then(orders => {
            const response = {
                count: orders.length,
                orders: orders.map(order => {
                    return {
                        _id: order._id,
                        product: order.product,
                        quantity: order.quantity,
                        type: 'GET',
                        url: 'http://localhost:3001/orders/' + order._id
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
}
exports.get_order = (req,res) => {
    Order_Model.findById(req.params.order_id)
        .then(order => {
            if (order)
                res.status(200).json(order);
            else
                res.status(404).json({ message: 'Order not found' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
exports.create_order = (req,res) => {
    Product_Model.findById(req.body.product_id)
        .then(product => {
            if (product) {
                const order = new Order_Model({
                    _id: mongoose.Types.ObjectId(),
                    product: req.body.product_id,
                    quantity: req.body.quantity
                })
                order.save()
                    .then(result => {
                        res.status(201).json(result);
                    })
                    .catch(err => {
                        res.status(500).json({ error: err });
                    })
            }
            else
                res.status(404).json({ message: 'Product not found' });
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
exports.update_order = (req,res) => {
    Order_Model.findById(req.params.order_id)
        .then(order => {
            if(order) {
                Order_Model.updateOne(
                    {_id : req.params.order_id},
                    {
                        $set:{
                            product : req.body.product_id,
                            quantity : req.body.quantity 
                        }
                    }
                )
                    .exec()
                    .then(result => {
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        res.status(500).json({ error : err })
                    })
            }
            else
                res.status(404).json({ message: 'Order not found' })
        })
        .catch(err => res.status(500).json({ error : err }))
}
exports.delete_order = (req,res) => {
    Order_Model.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => res.status(500).json({error : err}))
}