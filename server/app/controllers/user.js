const User = require('../../models/user');

// GET ALL users
module.exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find();

        const data = users.map(user => ({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            created: user.created,
            updated: user.updated,
            id: user._id
        }));

        res.json({
            success: true,
            message: "Users list retrieved successfully.",
            data: data
        });
    } catch (error) {
        next(error);
    }
};

// GET user by ID
module.exports.getById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.json({
            success: true,
            message: "User retrieved successfully.",
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                created: user.created,
                updated: user.updated,
                id: user._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// ADD new user
module.exports.add = async (req, res, next) => {
    try {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            created: Date.now(),
            updated: Date.now()
        });

        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            message: "User added successfully.",
            data: {
                firstname: savedUser.firstname,
                lastname: savedUser.lastname,
                email: savedUser.email,
                created: savedUser.created,
                updated: savedUser.updated,
                id: savedUser._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE user
module.exports.update = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                updated: Date.now()
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.json({
            success: true,
            message: "User updated successfully."
        });
    } catch (error) {
        next(error);
    }
};

// DELETE user
module.exports.delete = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};
