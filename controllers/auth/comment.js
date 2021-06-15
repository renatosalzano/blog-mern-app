const Joi = require("joi");
const Comment = require("../../models/Comment");
const User = require("../../models/User");

exports.NEW_comment = async (req, res, next) => {
  try {
    const verified = res.locals.verified;
    const user_id = verified.user;
    const { content, post_id } = req.body;
    // joi validation
    const schema = Joi.object({
      post_id: Joi.string().required(),
      content: Joi.string()
        .required()
        .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    }

    // create new comment

    const new_comment = new Comment({
      user_id: user_id,
      post_id: post_id,
      content: content,
    });

    await new_comment.save();
    res.locals.comment_id = new_comment._id;
    return next();
  } catch (err) {
    return res.status(500).send();
  }
};

exports.UPDATE_comment = async (req, res, next) => {
  try {
    const comment_id = req.params.id;
    const user_id = res.locals.verified.user;
    const { content } = req.body;

    const schema = Joi.object({
      content: Joi.string().required(),
    });

    const { error } = schema.validate({ content: content });
    if (error) {
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    }
    const updated_content = { content: content };
    const comment = await Comment.findOneAndUpdate(
      { _id: comment_id, user_id: user_id },
      updated_content,
      (err) => {
        if (err) return res.status(401).send();
      }
    );
    res.locals.comment_id = comment._id;
    return next();
  } catch (err) {
    return res.status(500).send();
  }
};

exports.DELETE_comment = async (req, res) => {
  try {
    await Comment.findOneAndRemove(
      { _id: req.params.id, user_id: res.locals.verified.user },
      (err) => {
        if (err) return res.status(401).send(err);
      }
    );
    return res.status(200).json({ serverMessage: "Comment removed" });
  } catch (err) {
    return res.status(500).send();
  }
};
