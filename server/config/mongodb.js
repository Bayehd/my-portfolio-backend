
//added this
require('dotenv').config()
const mongoose = require('mongoose');
const uri = process.env.ATLASDB;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Export the function so server.js can use it
module.exports = async function configDB() {
    try {

        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Successfully connected to portfolio database!");    
    } 
    catch (error) {
        // If connection fails, stop the server
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }

}
//run().catch(console.dir);
