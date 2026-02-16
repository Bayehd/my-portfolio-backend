const Service = require('../../models/services');

// GET ALL services
module.exports.getAll = async (req, res, next) => {
    try {
        const services = await Service.find();

        // Map to replace _id with id
        const data = services.map(service => ({
            title: service.title,
            description: service.description,
            id: service._id
        }));

        res.json({
            success: true,
            message: "Services list retrieved successfully.",
            data: data
        });
    } catch (error) {
        next(error);
    }
};

// GET service by ID
module.exports.getById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.json({
            success: true,
            message: "Service retrieved successfully.",
            data: {
                title: service.title,
                description: service.description,
                id: service._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// ADD new service
module.exports.add = async (req, res, next) => {
    try {
        const service = new Service({
            title: req.body.title,
            description: req.body.description
        });

        const savedService = await service.save();

        res.status(201).json({
            success: true,
            message: "Service added successfully.",
            data: {
                title: savedService.title,
                description: savedService.description,
                id: savedService._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE service
module.exports.update = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description
            },
            { new: true }
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.json({
            success: true,
            message: "Service updated successfully."
        });
    } catch (error) {
        next(error);
    }
};

// DELETE service
module.exports.delete = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.json({
            success: true,
            message: "Service deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};