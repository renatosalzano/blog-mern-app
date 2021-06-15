const Joi = require("joi");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

exports.NEW_post = async (req, res, next) => {
  try {
    // verified = user_id
    const verified = res.locals.verified;
    const user_id = verified.user;
    const { title, content, tags } = req.body;
    // joi validation
    const schema = Joi.object({
      title: Joi.string().required().min(3).max(50),
      content: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    }

    // create new post

    const new_post = new Post({
      user_id: user_id,
      title: title,
      content: content,
      tags: tags,
    });

    await new_post.save();
    res.locals.post_id = new_post._id;

    return next();
  } catch (err) {
    return res.status(500).json({ error_message: `Internal Server Error` });
  }
};

exports.UPDATE_post = async (req, res, next) => {
  try {
    const user_id = res.locals.verified.user;
    const post_id = req.params.id;
    const { title, content, tags } = req.body;

    // joi validation
    const schema = Joi.object({
      title: Joi.string().required().min(3).max(50),
      content: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    }

    const updated_post = { title: title, content: content, tags: tags };

    await Post.findOneAndUpdate(
      { _id: post_id, user_id: user_id },
      updated_post,
      (err) => {
        if (err) return res.status(401).send();
      }
    );
    res.locals.post_id = post_id;
    return next();
  } catch (err) {
    return res.status(500).send();
  }
};

exports.DELETE_post = async (req, res) => {
  try {
    const post = await Post.findOneAndRemove({
      _id: req.params.id,
      user_id: res.locals.verified.user,
    });
    if (!post) return res.status(401).send();
    await Comment.deleteMany({ post_id: req.params.id });
    return res.status(200).json({ server_message: "Post removed" });
  } catch (err) {
    return res.status(500).send();
  }
};
