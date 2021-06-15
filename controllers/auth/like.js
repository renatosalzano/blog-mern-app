const Joi = require("joi");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

exports.LIKE_post = async (req, res) => {
  try {
    const user_id = res.locals.verified.user;
    const { target_id, type } = req.body;
    const update_like = { [type]: user_id };

    let opposed = type === "like" ? "dislike" : "like";
    const target = await Post.findOne({ _id: target_id });
    let update;
    if (target[type].includes(user_id)) {
      // dislike
      update = await Post.findByIdAndUpdate(
        target_id,
        { $pull: update_like },
        (err) => {
          if (err) return res.send(err);
        }
      );
    } else {
      if (target[opposed].includes(user_id)) {
        // if switch like/dislike
        update = await Post.findByIdAndUpdate(
          target_id,
          {
            $addToSet: update_like,
            $pull: { [opposed]: user_id },
          },
          (err) => {
            if (err) return res.send(err);
          }
        );
      } else {
        // like
        update = await Post.findByIdAndUpdate(
          target_id,
          {
            $addToSet: update_like,
          },
          (err) => {
            if (err) return res.send(err);
          }
        );
      }
    }

    res.status(200).json({ like: update.like, dislike: update.dislike });
  } catch (err) {
    res.status(500);
  }
};

exports.LIKE_comment = async (req, res) => {
  try {
    const user_id = res.locals.verified.user;
    const { target_id, type } = req.body;
    const update_like = { [type]: user_id };

    const target = await Comment.findOne({ _id: target_id });
    let update;
    if (target[type].includes(user_id)) {
      // remove like
      update = await Comment.findByIdAndUpdate(
        target_id,
        { $pull: update_like },
        (err) => {
          if (err) return res.send(err);
        }
      );
    } else {
      // like
      update = await Comment.findByIdAndUpdate(
        target_id,
        {
          $addToSet: update_like,
        },
        (err) => {
          if (err) return res.send(err);
        }
      );
    }
    /* console.log({ like: update.up }); */
    res.status(200).json({ like: update.like });
  } catch (err) {
    res.status(500);
  }
};
