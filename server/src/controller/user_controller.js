const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('src/utils/logger');
const path = require('path');
const factory = require('src/controller/handle_factory');
const User_Model = require('src/models/user');

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
                        // res.cookie(
                        //     'JWT',token,
                        //     {   
                        //         maxAge: 9999999,
                        //         httpOnly: true
                        //     }
                        // )
                        return res.status(200).json({token: token})
                    }
                    else {
                        return res.status(401).json(false)
                    }
                })
            }
            else{
                logger.error('User not found!')
                return res.status(200).json({ login_success: false })
            }   
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({ error: 'Something error. Please try again' })
        })
}
exports.get_all_users = factory.get_all(User_Model);

exports.get_user = factory.get_one(User_Model);

exports.delete_user = factory.delete_one(User_Model);

exports.create_user = factory.create_one(User_Model);

exports.update_user = factory.update_one(User_Model)
