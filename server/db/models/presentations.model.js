/**
 * Created by Jon on 1/27/16.
 */
var mongoose = require('mongoose');

/**
 * Nothing required yet
 */

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    datetime : {
        type : Date,
        default : Date.now
    },
    markdown: {
        type: String,
        default: ''
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classes'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    theme: {
        type: String,
        default: 'simple'
    },
    imageUrl: {
        type: String,
        default: 'https://cdn4.iconfinder.com/data/icons/business-management-2/256/Presentation-512.png'
    }
});

schema.statics.findPresentationsByOwner = function (userId) {
    return this.find({ owner: userId });
};

mongoose.model('Presentations', schema);
