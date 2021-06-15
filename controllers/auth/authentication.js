const Joi = require("joi");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

// register

exports.SIGN_UP_validation = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    const schema = Joi.object({
      user_name: Joi.string().alphanum().min(3).max(25).trim().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    }

    const existing_user = await User.findOne({ email: email });
    if (existing_user)
      return res.status(409).json({
        error_message: "An account with this email already exists.",
      });

    const existing_user_name = await User.findOne({ user_name: user_name });
    if (existing_user_name)
      return res.status(409).json({
        error_message: "An account with this user name already exists.",
      });

    // validation ok, crypt password

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(password, salt);

    // create a new user

    const new_user = new User({
      user_name: user_name,
      email: email,
      password_hash: password_hash,
    });

    const saved_user = await new_user.save();

    // sign in token

    const token = jwt.sign(
      {
        user: saved_user._id,
      },
      process.env.JWT_SECRET
    );

    return res.cookie("token", token).send();
  } catch (err) {
    return res.status(500).json({ error_message: "Server Error" });
  }
};

exports.LOG_IN_validation = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate user data
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    }

    // check if user exist

    const existing_user = await User.findOne({ email: email });
    if (!existing_user)
      return res.status(403).json({
        error_message: "Invalid email or password.",
      });

    // check password

    const password_correct = await bcrypt.compare(
      password,
      existing_user.password_hash
    );
    if (!password_correct)
      return res.status(403).json({ error_message: "Incorrect password" });

    // send token
    const token = jwt.sign(
      {
        user: existing_user._id,
      },
      process.env.JWT_SECRET
    );
    // send user info to client
    const user_info = {
      id: existing_user._id,
      user_name: existing_user.user_name,
      pic: existing_user.pic,
      email: existing_user.email,
      bio: existing_user.bio,
      date: existing_user.date,
    };

    return res.cookie("token", token).json({ user_info: user_info });
  } catch (err) {
    return res.status(500).json({ error_message: "Server Error" });
  }
};

// auth

exports.AUTH = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send();
    // verify token with jwt
    res.locals.verified = jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ server_message: "Unauthorized" });
  }
};

exports.DELETE_user = async (req, res) => {
  try {
    const user_id = res.locals.verified.user;
    const password = req.params.password;

    //validate user data
    const schema = Joi.object({
      password: Joi.string().required(),
    });
    const { error } = schema.validate({ password: password });
    if (error) {
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    }

    const user = await User.findById(user_id);
    if (!user) return res.status(401).send();

    // check password

    const password_correct = await bcrypt.compare(password, user.password_hash);
    if (!password_correct)
      return res.status(403).json({ error_message: "Incorrect password" });

    await Post.deleteMany({ user_id: user_id });
    await Comment.deleteMany({ user_id: user_id });
    await User.findByIdAndDelete(user_id);

    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  } catch (err) {
    return res.status(500), send();
  }
};

exports.UPDATE_password = async (req, res) => {
  try {
    const user_id = res.locals.verified.user;
    const { password, new_password } = req.body;
    const schema = Joi.object({
      password: Joi.string().min(5).required(),
      new_password: Joi.string().min(5).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    }
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(401).send();
    }

    const password_correct = await bcrypt.compare(password, user.password_hash);
    if (!password_correct)
      return res.status(403).json({ error_message: "Incorrect password" });

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(new_password, salt);

    const updated_password = { password_hash: password_hash };

    await User.findByIdAndUpdate(user_id, updated_password, (err) => {
      if (err) return res.status(401).send();
    });

    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
};
