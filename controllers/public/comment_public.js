const Joi = require("joi");
const Comment = require("../../models/Comment");
const User = require("../../models/User");

exports.GET_all_comment = async (req, res) => {
  try {
    console.log(req.params.post_id);
    const comments = await Comment.find({ post_id: req.params.post_id });
    let comment_list = [];
    for (let x = 0; x < comments.length; x++) {
      const get_author = await User.findOne({ _id: comments[x].user_id });
      const author_info = {
        user_name: get_author.user_name,
        thumbnail: get_author.pic,
      };
      let _comment = { comment: comments[x], author_info: author_info };
      comment_list.push(_comment);
    }

    res.status(200).json(comment_list);
  } catch (err) {
    res.status(500).send();
  }
};

exports.GET_comment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: res.locals.comment_id });
    const get_author = await User.findOne({ _id: comment.user_id });
    const author_info = {
      user_name: get_author.user_name,
      thumbnail: get_author.pic,
    };
    const comment_to_cli = { comment: comment, author_info: author_info };
    res.status(200).json(comment_to_cli);
  } catch (err) {
    res.status(500).send();
  }
};
