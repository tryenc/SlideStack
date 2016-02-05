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
    imageUrl: {
        type: String,
        default: 'https://cdn4.iconfinder.com/data/icons/business-management-2/256/Presentation-512.png'
    }
});

mongoose.model('Presentations', schema);
