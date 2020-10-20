const factory = require('src/controller/handle_factory');
const User_Model = require('src/models/user');
const auth_controller = require('src/controller/auth_controller');
const catch_async = require('src/utils/catch_async');
const AppError = require('src/utils/app_error');

exports.login = auth_controller.login;

exports.get_all_users = factory.get_all(User_Model);

exports.get_user = factory.get_one(User_Model);

exports.delete_user = factory.delete_one(User_Model);

exports.create_user = factory.create_one(User_Model);

exports.update_user = factory.update_one(User_Model);

exports.find_user = factory.find_one(User_Model,{
    limit_fields : "_id avatar name mobile",
})

exports.get_request_friend = factory.find_one(User_Model,{
    pop_options : "friends_request",
    pop_limit_fields : "_id avatar mobile name",
    limit_fields : "_id friends_request"
})

exports.request_friend = catch_async((req,res,next) => {
    if(req.params.id && req.body.user_requested) {
        User_Model.findByIdAndUpdate(req.params.id,{
            $push : {
                friends_request : req.body.user_requested
            }
        })
            .then(response => {
                res.status(201).json({
                    status : "success",
                    data : response
                })
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    data : null
                })
            })
    } 
    else {
        return next(new AppError('Missing field user requested or user id'));
    }
})

exports.response_request_friend = catch_async((req,res,next) => {
    const user_id = req.params.id;
    const { requester_id,response_status } = req.body;
    console.log(req.body)

    if(user_id && requester_id) {
        if(response_status) { //Accepted
            User_Model.findByIdAndUpdate(requester_id,{
                $push : {
                    friends : user_id
                }
            })
            User_Model.findByIdAndUpdate(user_id,{
                $pull : {
                    friends_request : requester_id
                },
                $push : {
                    friends : requester_id
                }
            })
                .then(response => {
                    res.status(201).json({
                        status : "success",
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        status : "fail",
                        message : error
                    })
                })
        }
        else { 
            User_Model.findByIdAndUpdate(user_id,{
                $pull : {
                    friends_request : requester_id
                }
            })
                .then(response => {
                    res.status(201).json({
                        status: "success"
                    })
                })
        }
        
    }
    else 
        return next(new AppError('Missing field user requested or user id'));
})

exports.get_friends = factory.find_one(User_Model,{
    pop_options : "friends",
    pop_limit_fields : "_id avatar mobile name",
    limit_fields : "_id friends"
})