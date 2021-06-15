const Joi = require("joi");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

exports.GET_post = async (req, res) => {
  try {
    let filter = {}; //--> default src
    if (req.query.by && req.query.value) {
      filter = { [req.query.by]: req.query.value };
      if (req.query.by === "user_name") {
        const _user = await User.findOne({ user_name: req.query.value });
        filter = { user_id: _user._id };
      }
      if (req.query.by === "title") {
        let regex = new RegExp(req.query.value);
        filter = { title: { $regex: regex, $options: "i" } };
      }
    }

    const _posts = await Post.find(filter);

    if (_posts.length === 0) return res.status(404).send();
    let posts = [];
    let post;
    for (let x = 0; x < _posts.length; x++) {
      const get_author_info = await User.findOne({ _id: _posts[x].user_id });
      const user_info = {
        user_name: get_author_info.user_name,
        thumbnail: get_author_info.pic,
      };
      const comments = await Comment.find({ post_id: _posts[x]._id }).sort({
        date: -1,
      });
      if (comments.length > 0) {
        // => comment
        let _comment_list = [];
        let comment_remain = comments.length - 1;

        const _author_info = await User.findOne({ _id: comments[0].user_id });
        const author_info = {
          user_name: _author_info.user_name,
          thumbnail: _author_info.pic,
        };
        let _comment = { comment: comments[0], author_info: author_info };
        _comment_list.push(_comment);

        post = {
          post: _posts[x],
          user_info: user_info,
          comment_remain: comment_remain,
          comment_list: _comment_list,
        };
      } else {
        // => no comment
        post = {
          post: _posts[x],
          user_info: user_info,
          comment_remain: 0,
          comment_list: [],
        };
      }
      posts.push(post);
    }

    return res.json(posts);
  } catch (err) {
    res.status(500).send();
  }
};

exports.GET_new_post = async (req, res) => {
  try {
    const _post = await Post.findOne({ _id: res.locals.post_id });
    const get_author_info = await User.findOne({ _id: _post.user_id });
    const user_info = {
      user_name: get_author_info.user_name || "utente eliminato",
      thumbnail: get_author_info.pic || "",
    };

    const post = {
      post: _post,
      user_info: user_info,
      comment_list: [],
    };
    return res.json(post);
  } catch (err) {
    res.status(500).send();
  }
};

exports.GET_updated_post = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: res.locals.post_id });
    return res.status(200).json(post);
  } catch (err) {
    res.status(500).send();
  }
};
