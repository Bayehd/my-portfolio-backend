const Project = require('../models/projects');

// GET ALL projects
module.exports.getAll = async function (req, res, next) {
    try {
        let projects = await Project.find({});
        
        let data = projects.map(project => ({
            title: project.title,
            completion: project.completion,
            description: project.description,
            role: project.role,              // ← ADD
            outcome: project.outcome,        // ← ADD
            technologies: project.technologies, // ← ADD
            image: project.image,            // ← ADD
            liveUrl: project.liveUrl,        // ← ADD
            githubUrl: project.githubUrl,    // ← ADD
            id: project._id
        }));
        
        res.json({
            success: true,
            message: "Projects list retrieved successfully.",
            data: data
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// GET project by ID
module.exports.getById = async function (req, res, next) {
    try {
        let id = req.params.id;
        let project = await Project.findOne({ _id: id });
        
        if (!project)
            throw new Error('Project not found.');
        
        res.json({
            success: true,
            message: "Project retrieved successfully.",
            data: {
                title: project.title,
                completion: project.completion,
                description: project.description,
                role: project.role,              // ← ADD
                outcome: project.outcome,        // ← ADD
                technologies: project.technologies, // ← ADD
                image: project.image,            // ← ADD
                liveUrl: project.liveUrl,        // ← ADD
                githubUrl: project.githubUrl,    // ← ADD
                id: project._id
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// ADD new project
module.exports.add = async function (req, res, next) {
    try {
        let newProject = new Project(req.body);
        let result = await Project.create(newProject);
        console.log(result);
        
        res.status(200);
        res.json({
            success: true,
            message: "Project added successfully.",
            data: {
                title: result.title,
                completion: result.completion,
                description: result.description,
                role: result.role,              
                outcome: result.outcome,        
                technologies: result.technologies, 
                image: result.image,           
                liveUrl: result.liveUrl,       
                githubUrl: result.githubUrl,    
                id: result._id
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// UPDATE project
module.exports.update = async function (req, res, next) {
    try {
        let id = req.params.id;
        
        // Use req.body directly and remove _id
        let updateData = { ...req.body };
        delete updateData._id;
        
        let result = await Project.updateOne({ _id: id }, updateData);
        console.log(result);
        
        if (result.modifiedCount > 0) {
            res.status(200);
            res.json({
                success: true,
                message: "Project updated successfully."
            });
        }
        else {
            throw new Error('Project not updated. It does not exist or there is nothing to change.')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// DELETE project
module.exports.delete = async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await Project.deleteOne({ _id: id });
        console.log(result);
        
        if (result.deletedCount > 0) {
            res.status(200);
            res.json({
                success: true,
                message: "Project deleted successfully."
            });
        }
        else {
            throw new Error('Project not deleted. Are you sure the id is correct?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};