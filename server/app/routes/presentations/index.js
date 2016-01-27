/**
 * Created by Jon on 1/27/16.
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const PresentationsModel = mongoose.model('Presentations');

// Get all presentations
router.get('/', (req, res, next) => {

    PresentationsModel.find().exec()
        .then(presentations => {
            res.send(presentations);
        })
        .catch(next);

});

// Get a presentation by _id
router.get('/:id', (req, res, next) => {

    PresentationsModel.findById(req.params.id).exec()
        .then(presentation => {
            res.send(presentation);
        })
        .catch(next);

});

// Create new presentation
router.post('/', (req, res, next) => {

    PresentationsModel.create(req.body).exec()
        .then( () => {
            res.sendStatus(201);
        })
        .catch(next);

});

// Update a presentation
router.put('/:id', (req, res, next) => {

    PresentationsModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).exec()
        .then(updatedPresentation => {
            res.send(updatedPresentation);
        })
        .catch(next);

});

// Delete a presentation
router.delete('/:id', (req, res, next) => {

    PresentationsModel.findByIdAndRemove(req.params.id).exec()
        .then(deletedPresentation => {
            res.send(deletedPresentation);
        })
        .catch(next);

});

module.exports = router;
