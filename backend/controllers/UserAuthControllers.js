// const UserAuthModels = require("../models/UserAuthModels");

const displayHelloWorld = async (req, res) => {
    try {
        res.status(200).json({message: "Hello World"});
    }   catch (e) {
        res.status(400).json({message: 'Error Occured'});
    }
}

module.exports = {displayHelloWorld};