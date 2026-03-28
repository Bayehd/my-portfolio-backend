const Service = require('../models/services');

// GET ALL services
module.exports.getAll = async function (req, res, next) {
    try {
        let services = await Service.find({});
        
        let data = services.map(service => ({
            title: service.title,
            description: service.description,
            features: service.features,
            image: service.image,
            id: service._id
        }));
        
        res.json({
            success: true,
            message: "Services list retrieved successfully.",
            data: data
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// GET service by ID
module.exports.getById = async function (req, res, next) {
    try {
        let id = req.params.id;
        let service = await Service.findOne({ _id: id });
        
        if (!service)
            throw new Error('Service not found.');
        
        res.json({
            success: true,
            message: "Service retrieved successfully.",
            data: {
                title: service.title,
                description: service.description,
                features: service.features,
                image: service.image,
                id: service._id
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// ADD new service
module.exports.add = async function (req, res, next) {
    try {
        let newService = new Service(req.body);
        let result = await Service.create(newService);
        console.log(result);
        
        res.status(200);
        res.json({
            success: true,
            message: "Service added successfully.",
            data: {
                title: result.title,
                description: result.description,
                features: result.features,
                image: result.image,
                id: result._id
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// UPDATE service
module.exports.update = async function (req, res, next) {
    try {
        let id = req.params.id;
        
        let updateData = { ...req.body };
        delete updateData._id;
        
        let result = await Service.updateOne({ _id: id }, updateData);
        console.log(result);
        
        if (result.modifiedCount > 0) {
            res.status(200);
            res.json({
                success: true,
                message: "Service updated successfully."
            });
        }
        else {
            throw new Error('Service not updated. It does not exist or there is nothing to change.')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// DELETE service
module.exports.delete = async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await Service.deleteOne({ _id: id });
        console.log(result);
        
        if (result.deletedCount > 0) {
            res.status(200);
            res.json({
                success: true,
                message: "Service deleted successfully."
            });
        }
        else {
            throw new Error('Service not deleted. Are you sure the id is correct?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};