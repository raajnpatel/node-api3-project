const express = require('express');
const Post = require('../posts/postDb');

const router = express.Router();

router.get('/', (req, res) => {
  Post.get()
      .then(post => {
          res
              .status(200)
              .json(post)
      })
      .catch(error => {
          console.log(error);
          res
              .status(500)
              .json({error:"There was an error reaching the server."})
      })
});

router.get('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
  Post.getById(id)
      .then(post => {
          res
              .status(200)
              .json(post)
      })
      .catch(error => {
          console.log(error);
          res
              .status(500)
              .json({error:"There was an error reaching the server."})
      })
});

router.delete('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
    Post.remove(id)
        .then(removed => {
            if(removed) {
                res
                    .status(204)
                    .json({message: "The entry has been deleted."})
            } else {
                res
                    .status(404)
                    .json({error:"That entry ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was an error reaching the server."})
        })
});

router.put('/:id', validatePostId, (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  Post.update(id, {text})
      .then(updated => {
          if(updated){
              // console.log(updated);
              Post.getById(id)
                  .then(newtext => {
                      // console.log(newtext);
                      if(newtext){
                          res
                              .status(201)
                              .json(newtext)
                      } else {
                          res
                              .status(404)
                              .json({error:"Error making changes."})
                      }
                  })
                  .catch(error => {
                      console.log(error);
                      res
                          .status(500)
                          .json({error:"Error reaching server."})
                  })
          }
      })
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;
    Post.getById(id)
        .then(post => {
            if(post){
                req.post = post;
                next();
            } else {
                res
                    .status(404)
                    .json({error:"User ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was a problem reaching the server."})
        })
}

module.exports = router;
