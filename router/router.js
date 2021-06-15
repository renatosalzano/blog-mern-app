const router = require("express").Router();

// USER
const { GET_user } = require("../controllers/public/user_public");

router.get("/user/src/:user_name", GET_user);

// POST

const { GET_post } = require("../controllers/public/post_public");

router.get("/post/src/", GET_post);

// COMMENT

const { GET_all_comment } = require("../controllers/public/comment_public");

router.get("/comment/:post_id", GET_all_comment);

module.exports = router;
