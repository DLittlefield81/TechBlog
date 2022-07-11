const router = require("express").Router();
const withAuth = require('../utils/auth')
const { Post, Comment, User } = require("../models/");

// get all posts for homepage
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                  
                },
            ],
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


router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'postTitle',
            'postContent',
            'dateCreated'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'commentContent', 'post_id', 'user_id', 'dateCreated'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            const post = postData.get({
                plain: true
            });

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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