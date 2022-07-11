const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

// //get all posts where user id is the user
// router.get("/", withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             where: { user_id: req.session.id },

//         });
//         const posts = postData.map((post) => post.get({ plain: true }));
//         res.render("adminDashboard", {
//             layout: "dashboard",
//             posts,
//             // loggedIn: req.session.loggedIn
//         });
//     }
//     catch (err) {
//         console.log(err);
//         res.redirect("/login");
//     }
// });
router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
        }
    })
        .then(postData => {
            const posts = postData.map((post) => post.get({ plain: true }));

            res.render("adminDashboard", {
                layout: "dashboard",
                posts
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect("login");
        });
});

// router.get("/new", withAuth, (req, res) => {
//     res.render("adminDashboard", {
//         layout: "dashboard",
//         loggedIn: req.session.loggedIn
//     });
// });

router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id)
        .then(postData => {
            if (postData) {
                const post = postData.get({ plain: true });

                res.render("edit-post", {
                    layout: "dashboard",
                    post,
                    loggedIn: req.session.loggedIn
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;