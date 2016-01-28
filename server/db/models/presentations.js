/**
 * Created by Jon on 1/27/16.
 */
var mongoose = require('mongoose');

/**
 * Nothing required yet until seed files are written
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
        ref: 'Class'
    }
});

mongoose.model('Presentations', schema);
