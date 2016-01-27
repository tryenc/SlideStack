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
    description: {
        type: String
    }
});

mongoose.model('Class', schema);
