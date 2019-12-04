const express = require('express');
const User = require('./userDb');
const Post = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const user = req.body;
  User.insert(user)
      .then(user => {
          res
              .status(201)
              .json(user)
      })
      .catch(error => {
          console.log(error);
          res
              .status(500)
              .json({error:"There was a problem reaching the server."})
      })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const post = req.body;
    Post.insert(post)
        .then(post => {
            console.log(post);
        res
            .status(201)
            .json(post)
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was a problem reaching the server."})
        })
});

router.get('/', (req, res) => {
  User.get()
      .then(users => {
          res
              .status(200)
              .json(users)
      })
      .catch(error => {
          console.log(error);
          res
              .status(500)
              .json({error:"There was a problem reaching the server."})
      })
});

router.get('/:id', validateUserId, (req, res) => {
        res
            .status(200)
            .json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const { id } = req.params;
    User.getUserPosts(id)
        .then(posts => {
            console.log(posts);
            res
                .status(200)
                .json(posts)
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was a problem reaching the server."})
        })
});

router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    User.remove(id)
        .then(()=> {
            res
                .status(204)
                .json({message:"The entry has been deleted."})
                .end();
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was a problem reaching the server."})
            }
        )

});

router.put('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    User.update(id, {name})
        .then(updated => {
            if(updated){
                User.getById(id)
                    .then(user => {
                        res
                            .status(200)
                            .json(user)
                    })
                    .catch(error => {
                        console.log(error);
                        res
                            .status(400)
                            .json({error:"Error retrieving User with that ID."})
                    })}
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"There was a problem reaching the server."})
        })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  User.getById(id)
      .then(user => {
          if(user){
              req.user = user;
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

function validateUser(req, res, next) {
    const { name } = req.body;
    if(!req.body) {
        return res
            .status(400)
            .json({error:"Missing user data."})
    } else if(typeof name !== 'string' || !name){
        return res
            .status(400)
            .json({error:"Missing required text(user) field."})
    }
    next();
}

function validatePost(req, res, next) {
    const { id: user_id } = req.params;
    const { text } = req.body;

    if(!req.body){
        return res
            .status(400)
            .json({message:"Missing post data."})
    } else if (typeof text !== 'string' || !text){
        return res
            .status(400)
            .json({message:"Missing required text(post) field."})
    }
    req.body = { user_id, text };
    next();
}

module.exports = router;
