const Project = require('../../models/projects');

// GET ALL projects
module.exports.getAll = async (req, res, next) => {
    try {
        const projects = await Project.find();

        const data = projects.map(project => ({
            title: project.title,
            completion: project.completion,
            description: project.description,
            id: project._id
        }));

        res.json({
            success: true,
            message: "Projects list retrieved successfully.",
            data: data
        });
    } catch (error) {
        next(error);
    }
};

// GET project by ID
module.exports.getById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        res.json({
            success: true,
            message: "Project retrieved successfully.",
            data: {
                title: project.title,
                completion: project.completion,
                description: project.description,
                id: project._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// ADD new project
module.exports.add = async (req, res, next) => {
    try {
        const project = new Project({
            title: req.body.title,
            completion: req.body.completion,
            description: req.body.description
        });

        const savedProject = await project.save();

        res.status(201).json({
            success: true,
            message: "Project added successfully.",
            data: {
                title: savedProject.title,
                completion: savedProject.completion,
                description: savedProject.description,
                id: savedProject._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE project
module.exports.update = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                completion: req.body.completion,
                description: req.body.description
            },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        res.json({
            success: true,
            message: "Project updated successfully."
        });
    } catch (error) {
        next(error);
    }
};

// DELETE project
module.exports.delete = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        res.json({
            success: true,
            message: "Project deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};