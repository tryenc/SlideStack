/**
 * Created by Jon on 1/27/16.
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

// Get all users
router.get('/', (req, res, next) => {

    UserModel.find().populate('classes')
        .then(users => {
            res.send(users);
        })
        .then(null, next);

});

// Get a user by _id
router.get('/:id', (req, res, next) => {

    var user;

    UserModel.findById(req.params.id)
        .populate('classes presentations')
        .then(returnedUser => {
            user = returnedUser;
            if(user.isStudent){
                return res.send(user);
            }
            return user.getStudents()
        })
        .then(students => {
            user = user.toObject()
            //'toObject' turns 'user', which is a mongoose document, into a JS object, which gives us the ability to add properties to it
            user.students = students;
            console.log("user", user);
            res.json(user);
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
    }).populate('classes')
        .then(updatedUser => {
            console.log(updatedUser);
            res.send(updatedUser);
        })
        .then(null, next);

});

// Delete a user
router.delete('/:id', (req, res, next) => {

    UserModel.findByIdAndRemove(req.params.id)
        .then(deletedUser => {
            res.send(deletedUser);
        })
        .then(null, next);

});

module.exports = router;
