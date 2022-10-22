const mongoose = require('mongoose');

// Connect mongoose to monogdb
mongoose.connect('mongodb://127.0.0.1:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//exporting our mongoose connection
module.exports = mongoose.connection;