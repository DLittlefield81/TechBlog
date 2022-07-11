const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
  console.log('POST HERE<<<<<<<<<<<<<<<<<<<<<<<<<<<')
  try {
    const newPost = await Post.create({
      postTitle: req.body.post_title,
        postContent: req.body.post_content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Edit Post with ID
router.put("/:id", async (req, res) => {
  Post.update({
    postTitle: req.body.post_title,
    postContent: req.body.post_content,
  }, {
    where: {
      id: req.params.id//, loggedIn: req.session.loggedIn
    }
  })
    .then(affectedRows => {
      if (!affectedRows) {
        res.status(404).json({message: "No record with that ID"});
        return;  
      }
      res.json(affectedRows)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;