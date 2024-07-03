const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rohitkumawat:1234@cluster0.xc60sdw.mongodb.net/Chat-Application?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("MongoDB connected successfully.");
    }).catch((error) => {
        console.log(`Something Went Wrong with the error: ${error}`);
    })

module.exports = mongoose;