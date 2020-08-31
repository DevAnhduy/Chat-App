const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('src/utils/logger');
const path = require('path');
const factory = require('src/controller/handle_factory');
const User_Model = require('src/models/user');
const auth_controller = require('src/controller/auth_controller');

exports.login = auth_controller.login;

exports.get_all_users = factory.get_all(User_Model);

exports.get_user = factory.get_one(User_Model);

exports.delete_user = factory.delete_one(User_Model);

exports.create_user = factory.create_one(User_Model);

exports.update_user = factory.update_one(User_Model)
