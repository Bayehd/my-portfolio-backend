const Reference = require('../../models/references');

// GET ALL references
module.exports.getAll = async (req, res, next) => {
    try {
        const references = await Reference.find();

        const data = references.map(reference => ({
            firstname: reference.firstname,
            lastname: reference.lastname,
            email: reference.email,
            position: reference.position,
            company: reference.company,
            id: reference._id
        }));

        res.json({
            success: true,
            message: "References list retrieved successfully.",
            data: data
        });
    } catch (error) {
        next(error);
    }
};

// GET reference by ID
module.exports.getById = async (req, res, next) => {
    try {
        const reference = await Reference.findById(req.params.id);

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found."
            });
        }

        res.json({
            success: true,
            message: "Reference retrieved successfully.",
            data: {
                firstname: reference.firstname,
                lastname: reference.lastname,
                email: reference.email,
                position: reference.position,
                company: reference.company,
                id: reference._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// ADD new reference
module.exports.add = async (req, res, next) => {
    try {
        const reference = new Reference({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            position: req.body.position,
            company: req.body.company
        });

        const savedReference = await reference.save();

        res.status(201).json({
            success: true,
            message: "Reference added successfully.",
            data: {
                firstname: savedReference.firstname,
                lastname: savedReference.lastname,
                email: savedReference.email,
                position: savedReference.position,
                company: savedReference.company,
                id: savedReference._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE reference
module.exports.update = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndUpdate(
            req.params.id,
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                position: req.body.position,
                company: req.body.company
            },
            { new: true }
        );

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found."
            });
        }

        res.json({
            success: true,
            message: "Reference updated successfully."
        });
    } catch (error) {
        next(error);
    }
};

// DELETE reference
module.exports.delete = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndDelete(req.params.id);

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found."
            });
        }

        res.json({
            success: true,
            message: "Reference deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};