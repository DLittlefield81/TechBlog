const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");
console.log(">>>>>>>>>>>>>>>Post Route PAGE");
//Create New Post
router.post("/", withAuth, (req, res) => {
  const content = req.body;
  console.log(">>>>>>>>>>>>>>>Post Route POST");
  Post.create({ ...content })
    .then(newPost => {
      res.json(newPost, req.session.userId);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Edit Post with ID
router.put("/:id", withAuth, (req, res) => {
  console.log(">>>>>>>>>>>>>>>Post Route PUT");
  Post.update(req.body, {
    where: {
      id: req.params.id, loggedIn: req.session.loggedIn
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      "id": req.params.id
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;