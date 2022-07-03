const router = require("express").Router();
const withAuth = require('../utils/auth')
const { Post, Comment, User } = require("../models/");

// get all posts for homepage
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn
        });
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// get single post
router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk({
            where: { id: req.params.id },
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        if (postData) {
            // serialize the data
            const post = postData.get({ plain: true });
            // which view should we render for a single-post? - DONE!
            console.log(post);
            res.render('single-post', { post });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("dashboard");
        return;
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

module.exports = router;