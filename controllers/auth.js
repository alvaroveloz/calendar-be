// This line was added to call the methods from express, its not neccesary but helps to the development.
const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists.',
      });
    }

    user = new User(req.body);

    // Encrypt password using sync methods
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //  Encrypt password using async methods
    // const salt = await bcrypt.genSalt();
    // user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generate JWT
    const token = await generateJWT(user._id, user.name);

    return res.status(201).json({
      ok: true,
      msg: 'User was created succesfully!!!',
      uid: user._id, // _id or id is the same, you can use both
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error was ocurred in creating user.',
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User and password were incorrect.',
      });
    }

    // Confirm passwords
    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: 'User and Password incorrect.',
      });
    }

    // Generate JWT
    const token = await generateJWT(user._id, user.name );

    return res.status(200).json({
      ok: true,
      msg: 'renew',
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error was ocurred while trying to login.',
    });
  }
};

const refreshToken = async (req, res = response) => {


  // const uid = req.uid;
  // const name= req.name;
const { uid, name } = req;

  const token = await generateJWT(uid, name);

  return res.json({
    ok: true,
    msg: 'renew',
    uid,
    name,
    token
  });
};

module.exports = {
  createUser,
  loginUser,
  refreshToken,
};
