const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const path = require('path')

const User_Model = require('../models/user');
const { resolveSoa } = require('dns');

exports.login = (req,res) => {
    User_Model.findOne({ username: req.body.username })
        .exec()
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err)
                        return res.status(401).json({ message: 'Auth failed' });
                    if (result) {
                        const token = jwt.sign({
                            username: user.username,
                            user_id: user._id
                        }, process.env.JWT_KEY )
                        console.log('Check user successfully')
                        console.log(res.cookies)
                        //return res.status(200).json({ message: 'Auth successful', token: token });
                        //return res.setHeader('Set-Cookie', [`token:${token}; HttpOnly`])
                        //return res.redirect('/')
                        res.cookie(
                            'JWT',token,
                            {   
                                maxAge: 99999999,
                                httpOnly: true
                            }
                        )
                        return res.status(200).json({message: 'Success'})
                        
                    }
                    else {
                        res.status(401).json({ message: 'Auth failed' });
                    }
                })
            }
            else{
                logger.error('User not found!')
                res.status(401).json({ message: 'Auth failed' });
            }   
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({ error: 'error' })
        })
}
exports.get_all_users = (req,res) => {
    User_Model.find()
        .exec()
        .then(users => {
            const response = {
                count: users.length,
                user: users.map(user => {
                    return {
                        _id : user._id,
                        username: user.username,
                        password: user.password,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3001/users/${user._id}`
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({ error: err });
        })
}
exports.get_user = (req,res) => {
    const user_id = req.params.user_id;
    User_Model.findById(user_id)
        .exec()
        .then(user => {
            if (user && user.username === req.user.username) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ message: '404 not found' });
            }
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({ error: err });
        })
}
exports.create_user = (req,res) => {
    User_Model.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length) {
                res.status(409).json({ message: 'Username exists' })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err)
                        res.status(500).json({ error: err })
                    else {
                        const user = new User_Model({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash
                        });
                        user.save()
                            .then(result => res.status(201).json(result))
                            .catch(err => {
                                res.status(500).json({ error: err })
                                logger.error(err);
                            })
                    }
                })
            }
        })
}
exports.delete_user = (req,res) => {
    const id = req.params.user_id;
    User_Model.remove({ _id: id })
        .exec()
        .then(result => res.status(200).json(result))
        .catch(err => res.status({ error: err }))
}
exports.update_user = (req,res) => {
    const id = req.params.user_id;
    User_Model.update({ _id: id }, { $set: { name: req.body.new_name } })
        .exec()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }))
}