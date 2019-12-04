const express = require('express');
const User = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
    const { name } = req.body;
    if(!name) {
        return res
            .status(400)
            .json({error:"You must provide a name."})
    }
  User.insert({name})
      .then(user => {
          res
              .status(200)
              .json(user)
      })
      .catch(error => {
          console.log(error);
          res
              .status(500)
              .json({error:"There was a problem reaching the server."})
      })
});

router.post('/:id/posts', (req, res) => {
    const { id } = req.params;
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
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
