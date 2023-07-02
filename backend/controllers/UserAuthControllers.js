const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const UserAuthModels = require('../models/UserAuthModels');

require("dotenv").config();
const { SECRET_KEY, JWT_EXPIRES } = process.env;

// To Create a new User - POST
// Register
const addUserDetails = async (req, res) => {
    try {
        const { uname, gmail, pwd } = req.body;
        const userExist = await UserAuthModels.findOne({ gmail });
        if (userExist) {
            return res.json({ message: 'User already Exist' });
        }

        // Salt is a random value to add security to the hashing process
        const salt = await bcrypt.genSalt(10);
        // It was used to hashed the password
        const hashedPassword = await bcrypt.hash(pwd, salt);
        const task = await UserAuthModels.create({ uname, gmail, pwd: hashedPassword, cpwd: hashedPassword });
        console.log(task);
        res.status(200).json(task);
    } catch (e) {
        res.status(400).json({ message: 'Error Occured' });
    }
}

// To get a single user Detail - GET
// To find a user existance
// Login
const getAUserDetails = async (req, res) => {
    const { uname, gmail, pwd } = req.body;
    try {
        const task = await UserAuthModels.findOne({ gmail });

        // To compare the pwd post in login and hashed pwd
        const isPasswordMatched = bcrypt.compare(pwd, task.pwd);
        if (task) {
            if (isPasswordMatched && task.uname === uname) {
                const taskObject = task.toObject();     // You needs to convert the payloads into object;
                const token = jwt.sign(taskObject, SECRET_KEY, {expiresIn: JWT_EXPIRES});
                return res.status(200).json({message:'Login Successfull', token})
            } else {
                res.status(200).json({ message: "User not found" });
            }
        } else {
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