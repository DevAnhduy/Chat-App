const catch_async = require('src/utils/catch_async');
const AppError = require('src/utils/app_error');
const jwt = require('jsonwebtoken');
const Mongodb_Query = require('src/utils/mongodb_query');
const User_Model = require('src/models/user');

//Create one handle factory
exports.create_one = Model => catch_async(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if(!doc) return next(new AppError('Some thing error',500)) 
    res.status(201).json({
      status: 'success',
      data: doc
    });
});
//Get one handle factory
exports.get_one = (Model,pop_options) => catch_async(async (req,res,next) => {
    let query = Model.findById(req.params.id);
    if(pop_options) query = query.populate(pop_options);
    const doc = await query;
    
    if(!doc) return next(new AppError('No document found with that ID',404))

    res.status(200).json({
        status: 'success',
        data: doc
    });
});
//Get all handle factory
exports.get_all = (Model, pop_options) => catch_async(async (req,res,next) => {
    let query = Model.find();
    if(pop_options) query = query.populate(pop_options);
    const mongodb_query = new Mongodb_Query(query,req.query).paginate().filter();
    const docs = await mongodb_query.query;
    if(!docs) return next(new AppError('No document found',404))
    
    res.status(200).json({
        status: 'success',
        data: docs
    });
})
//Update one handle factory
exports.update_one = Model => catch_async(async (req,res,next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id,req.body);
    if(!doc) return next(new AppError('No document found with that ID'))

    res.status(204).json({
        status: 'success'
    });
});
//Delete one handle factory
exports.delete_one = Model => catch_async(async (req,res,next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if(!doc) return next(new AppError('No document found with that ID'));

    res.status(204).json({
        status: 'success',
        data: null
    })
})
//Protect factory
exports.protect = Model => catch_async(async (req,res,next) => {
    // Getting token and check it
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    if(!token)  return next(new AppError('You are not logged in ! Please log in to get access ',401));
    // Verification token
    const decoded = await jwt.verify(token,process.env.JWT_KEY);
    // Check if user still exitsts
    const current_user = await Model.findById(decoded.id);
    if(!current_user)
        return next(new AppError('The user belonging to this token does no longer exist.',401));
    // Check if user changed password after the token was issued
    if(current_user.changed_password_after(decoded.iat))
        return next(new AppError('User recently changed password ! Please log in again !',401));
    // Grant access to protected route
    req.user = current_user;
    next();
});
