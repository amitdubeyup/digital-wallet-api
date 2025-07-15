const UserModal = require('../models/user');
const Controller = require('./wallet');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectId = require('mongoose').Types.ObjectId;

const loginUser = async (req, res) => {
  try {
    const result = await UserModal.findOne({
      $or: [{
        email: (req.body?.email)?.trim() ?? '',
      },
      {
        mobile: (req.body?.mobile)?.trim() ?? '',
      }
      ]
    });
    if (result) {
      const match = await bcrypt.compare((req.body?.password)?.trim() ?? '', result.password);
      if (match) {
        if (result.status == 1) {
          const payload = {
            _id: result._id,
            name: result.name,
            email: result.email,
            mobile: result.mobile,
          };
          const token = jwt.sign({
            data: payload,
          },
            config.server_secret, {
            expiresIn: config.token_expirey,
          }
          );
          return res.send({
            success: true,
            message: 'Logged in successfully.',
            token: token
          });
        } else {
          throw new Error('Account blocked, Please contact with support administrator.');
        }
      } else {
        throw new Error('Invalid credentials, please try again.');
      }
    } else {
      throw new Error('Account does not exists, please register.');
    };
  } catch (error) {
    return res.send({
      success: false,
      message: error?.message ?? 'Unable to login, please try after some time.'
    });
  }
}

const registerUser = async (req, res) => {
  try {
    const result = await UserModal.find({
      $or: [{
        email: (req.body?.email)?.trim() ?? '',
      },
      {
        mobile: (req.body?.mobile)?.trim() ?? '',
      }
      ]
    });
    if (result.length) throw new Error('The user is already registered, please try with a new account.');
    const password = await bcrypt.hash(req.body.password, 10);
    const user_data = await new UserModal({ ...req.body, password }).save();
    Controller.updateWallet({ user_id: user_data?._id, description: 'Wallet Setup' });
    return res.send({
      success: true,
      message: 'User registered successfully.'
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error?.message ?? 'Unable to register user.'
    });
  }
}

const fetchUser = async (req, res) => {
  try {
    const result = await UserModal.findOne({ _id: new ObjectId(req.params?._id) }).select(['name', 'email', 'mobile', 'status']);
    if (!result) throw new Error('User details not found, please try a different account.');
    return res.send({
      success: true,
      message: 'User fetched successfully.',
      data: result,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error?.message ?? 'Unable to fetch user.'
    });
  }
}

const updateUser = async (req, res) => {
  try {
    delete req.body?.password;
    const result = await UserModal.findByIdAndUpdate({ _id: new ObjectId(req.params?._id) }, { $set: req.body }, { new: true });
    if (!result) throw new Error('User details not found, please try a different account.');
    return res.send({
      success: true,
      message: 'User updated successfully.'
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error?.message ?? 'Unable to update user.'
    });
  }
}

const removeUser = async (req, res) => {
  try {
    const result = await UserModal.findByIdAndRemove({ _id: new ObjectId(req.params?._id) });
    if (!result) throw new Error('User details not found, please try a different account.');
    return res.send({
      success: true,
      message: 'User removed successfully.',
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error?.message ?? 'Unable to remove user.'
    });
  }
}

module.exports = {
  loginUser: loginUser,
  registerUser: registerUser,
  fetchUser: fetchUser,
  updateUser: updateUser,
  removeUser: removeUser
};
