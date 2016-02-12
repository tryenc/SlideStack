/**
 * Created by Jon on 1/27/16.
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const PresentationsModel = mongoose.model('Presentations');
const UserModel = mongoose.model('Users');

router.param('id', function (req, res, next, id) {
    PresentationsModel.findById(id)
        .populate('class owner')
        .then(presentation => {
            if (!presentation) {
                const err = new Error('Presentation not found');
                err.status = 404;
                return next(err);
            }
            req.presentation = presentation;
            next();
        })
        .then(null, next);
});

const ensureOwner = function (req, res, next) {
    if (req.user.isAdmin || req.presentation.owner === req.user._id) {
        next();
    } else {
        const err = new Error('Not authorized');
        err.status = 401;
        next(err);
    }
}

// Get all presentations
router.get('/', (req, res, next) => {

    PresentationsModel.find().populate('class owner')
        .then(presentations => {
            res.send(presentations);
        })
        .then(null, next);

});

// Get a presentation by _id
router.get('/:id', (req, res, next) => {
    res.json(req.presentation);
});

// Create new presentation
router.post('/', (req, res, next) => {

    PresentationsModel.create(req.body)
        .then(presentation => res.json(presentation))
        .then(null, next);
});

// Update a presentation
router.put('/:id', ensureOwner, (req, res, next) => {

    PresentationsModel.findByIdAndUpdate(req.params.id,
            req.body, { new: true }).exec()
        .then(updatedPresentation => {
            res.send(updatedPresentation);
        })
        .then(null, next);

});

// Delete a presentation
router.delete('/:id', ensureOwner, (req, res, next) => {

    PresentationsModel.findByIdAndRemove(req.params.id).exec()
        .then(deletedPresentation => {
            res.send(deletedPresentation);
        })
        .then(null, next);

});

module.exports = router;
