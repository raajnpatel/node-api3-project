const express = require('express');
const User = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
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
      .catch(error=> {
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

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
});

router.put('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    User.update(id, {name})
        .then(updated => {
            res
                .status(200)
                .json(updated)
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
