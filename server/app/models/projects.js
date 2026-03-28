const mongoose = require('mongoose');

// Schema for portfolio projects
const projectSchema = new mongoose.Schema(
    {
    title: String,
    description: String,
    role: String,          
    outcome: String,       
    technologies: [String], 
    image: String,         
    liveUrl: String,       
    githubUrl: String,     
    completion: Date    
    }
);

module.exports = mongoose.model('Project', projectSchema);