/**
 * Created by Jon on 1/27/16.
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

// Get all users
router.get('/', (req, res, next) => {

    UserModel.find().exec()
        .then(users => {
            res.send(users);
        })
        .then(null, next);

});

// Get a user by _id
router.get('/:id', (req, res, next) => {

    UserModel.findById(req.params.id)
        .populate('classes')
        .then(user => {
            console.log(user);
            res.send(user);
        })
        .then(null, next);

});

// Create new user
router.post('/', (req, res, next) => {

    UserModel.create(req.body)
        .then(newUser => {
            res.status(201).send(newUser);
        })
        .then(null, next);

});

// Update a user
router.put('/:id', (req, res, next) => {

    UserModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).exec()
        .then(updatedUser => {
            res.send(updatedUser);
        })
        .then(null, next);

});

// Delete a user
router.delete('/:id', (req, res, next) => {

    UserModel.findByIdAndRemove(req.params.id).exec()
        .then(deletedUser => {
            res.send(deletedUser);
        })
        .then(null, next);

});

module.exports = router;
