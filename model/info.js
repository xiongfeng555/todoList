var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist', { useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;

var info = new Schema({
    id: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        required: true
    }
});
module.exports = mongoose.model('Info', info)