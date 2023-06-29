const { Schema, default: mongoose } = require("mongoose");

const UserAuthModels = new Schema ({
    uname: {
        type: String,
        require: true
    },
    gmail: {
        type: String,
        require: true
    },
    pwd: {
        type: String,
        require: true
    },
    cpwd: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('UserAuthModels', UserAuthModels, 'Users');