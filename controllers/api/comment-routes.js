const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
    Comment.create({
        commentContent: req.body.comment_content,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
        .then(newComment => {
            res.json(newComment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;