const User = require('../models/user');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET;

/* GET USER ID */
exports.getUserId = async (req, res) => {
    try {
        if (req.session.userId) {
            res.json({ data: req.session.userId });
        }
    } catch (error) {
        res.json(error);
    }
};

/* USER SIGN UP */
exports.signup = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (error) {
        res.send(error);
    }
};

/* USER LOGIN */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            if (user.password === password) {
                const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
                req.session.userId = user._id;
                res.cookie("token", token);
                res.json('Success');
            } else {
                res.json('Wrong credentials');
            }
        } else {
            res.json("User does not exist");
        }
    } catch (error) {
        res.send(error);
    }
};

/* LOGIN AUTHENTICATION */
exports.dashboard = async (req, res) => {
    try {
        return res.json("Success");
    } catch (error) {
        res.send(error);
    }
};

/* ADD USER */
exports.addUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (error) {
        res.send(error);
    }
};

/* EDIT USER */
exports.editUser = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId); // admin
        const editUserId = req.params.id;   // user
        if (user.role === "admin") {
            await User.findByIdAndUpdate(editUserId, req.body);
            res.json('User edited successfully!');
        } else {
            res.json("Permission denied!");
        }
    } catch (error) {
        res.json(error);
    }
};

/* DELETE USER */
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId); // admin
        const toBeDeletedUserId = req.params.id;   // user
        if (user.role === "admin") {
            await User.findByIdAndDelete(toBeDeletedUserId);
            res.json('User delete successful!');
        } else {
            res.json("Permission denied!");
        }
    } catch (error) {
        res.json(error);
    }
};

/* GET USERS */
exports.getUsers = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId); // admin
        if (user.role === "admin") {
            const users = await User.find({});
            res.json(users);
        } else {
            res.json("Permission denied!");
        }
    } catch (error) {
        res.json(error);
    }
};
