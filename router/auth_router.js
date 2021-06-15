const auth_router = require("express").Router();
// CONTROLLER
const {
  SIGN_UP_validation,
  LOG_IN_validation,
  AUTH,
  UPDATE_password,
  DELETE_user,
} = require("../controllers/auth/authentication");
const {
  GET_user,
  UPDATE_user,
  UPDATE_email,
  UPDATE_user_name,
  UPLOAD_pic,
} = require("../controllers/auth/user");
const {
  NEW_post,
  UPDATE_post,
  DELETE_post,
} = require("../controllers/auth/post");
const {
  NEW_comment,
  UPDATE_comment,
  DELETE_comment,
} = require("../controllers/auth/comment");
const { GET_comment } = require("../controllers/public/comment_public");
const { LIKE_post, LIKE_comment } = require("../controllers/auth/like");
const {
  GET_new_post,
  GET_updated_post,
} = require("../controllers/public/post_public");

auth_router.post("/register", SIGN_UP_validation);

auth_router.post("/login", LOG_IN_validation);

// get user
auth_router.get("/user/info", AUTH, GET_user);
// update user info
auth_router.patch("/user/public", AUTH, UPDATE_user, GET_user);
auth_router.patch(
  "/user/account",
  AUTH,
  UPDATE_email,
  UPDATE_user_name,
  GET_user
);
//update password
auth_router.patch("/user/password", AUTH, UPDATE_password);
// DELETE ACCOUNT
auth_router.delete("/user/delete/:password", AUTH, DELETE_user);

// upload pic
auth_router.post("/user/upload", AUTH, UPLOAD_pic);
// log out
auth_router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

// POST ----------

// new post
auth_router.post("/post/new", AUTH, NEW_post, GET_new_post);
// update post
auth_router.patch("/post/update/:id", AUTH, UPDATE_post, GET_updated_post);
// delete post
auth_router.delete("/post/remove/:id", AUTH, DELETE_post);

// COMMENT ---------

//new comment
auth_router.post("/comment", AUTH, NEW_comment, GET_comment);

auth_router.patch("/comment/update/:id", AUTH, UPDATE_comment, GET_comment);

auth_router.delete("/comment/remove/:id", AUTH, DELETE_comment);

// LIKES ---------

// add/remove likes to post
auth_router.patch("/post/like", AUTH, LIKE_post);
// add/remove likes to comment
auth_router.patch("/comment/like", AUTH, LIKE_comment);

module.exports = auth_router;
