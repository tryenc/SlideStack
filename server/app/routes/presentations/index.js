/**
 * Created by Jon on 1/27/16.
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const PresentationsModel = mongoose.model('Presentations');
const UserModel = mongoose.model('User');

// Get all presentations
router.get('/', (req, res, next) => {

    PresentationsModel.find().populate('class')
        .then(presentations => {
            res.send(presentations);
        })
        .then(null, next);

});

// Get a presentation by _id
router.get('/:id', (req, res, next) => {

    PresentationsModel.findById(req.params.id).populate('class')
        .then(presentation => {
            if(presentation) console.log(presentation)
            else console.log("NOT FOUND")
            res.send(presentation);
        })
        .then(null, next);

});

// Create new presentation
router.post('/', (req, res, next) => {

    PresentationsModel.create(req.body.presentation)
        .then(presentation => {
            return UserModel.findByIdAndUpdate(req.body.user,
                {presentations: presentation._id}, {new: true});
        })
        .then(updatedUser => {
            res.send(updatedUser);
        })
        .then(null, next);

});

// Update a presentation
router.put('/:id', (req, res, next) => {

    PresentationsModel.findByIdAndUpdate(req.params.id,
            req.body, { new: true }).exec()
        .then(updatedPresentation => {
            res.send(updatedPresentation);
        })
        .then(null, next);

});

// Delete a presentation
router.delete('/:id', (req, res, next) => {

    PresentationsModel.findByIdAndRemove(req.params.id).exec()
        .then(deletedPresentation => {
            res.send(deletedPresentation);
        })
        .then(null, next);

});

module.exports = router;
