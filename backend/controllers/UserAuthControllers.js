const { default: mongoose } = require('mongoose');
const UserAuthModels = require('../models/UserAuthModels');

// To Create a new User - POST
const addUserDetails = async (req, res) => {
    try {
        const { uname, gmail, pwd, cpwd } = req.body;
        const task = await UserAuthModels.create({ uname, gmail, pwd, cpwd });
        res.status(200).json(task);
    } catch (e) {
        res.status(400).json({ message: 'Error Occured' });
    }
}

// To get a single user Detail - GET
// To find a user existance
const getAUserDetails = async (req, res) => {
    const { uname, gmail, pwd } = req.body;
    try {
        const task = await UserAuthModels.findOne({ gmail });
        if (task) {
            if (task.pwd === pwd && task.uname === uname) {
                res.status(200).json({ message: "Login Successfull", task });
            } else {
                res.status(200).json({ message: "User not found" });
            }
        }   else {
            res.status(200).json({ message: "User not found" });
        }
    } catch (e) {
        res.status(400).json({ message: "Error Occured" });
    }
}

// To Update User Detail - PATCH
const updateUserDetails = async (req, res) => {
    const { id } = req.params;
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ message: "User Not Found" });
    }

    try {
        const task = await UserAuthModels.findByIdAndUpdate({
            _id: id
        }, {
            ...req.body
        });
        res.status(200).json({ message: "Updated Successfully", task });
    } catch (e) {
        res.status(400).json({ message: "Error Occured" });
    }
}

const deleteUserDetails = async (req, res) => {
    const { id } = req.params;
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ message: "User Not Found" });
    }

    try {
        const task = await UserAuthModels.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted Successfully", task });
    } catch (e) {
        res.status(400).json({ message: "Error Occured" });
    }
}

module.exports = { addUserDetails, getAUserDetails, updateUserDetails, deleteUserDetails };