// Dependencies 
const express = require("express");
// const { dirname } = require("path"); // why need this?

// Express configuration
// Create "express" server
const app = express();

// Set initial port
const PORT = process.env.PORT || 4001;

// Set up Express app to to handle data parsing (AKA: Middleware)
app.use(express.urlencoded({ extended: true })); // urlencoded body from form submission
app.use(express.json()); // json submission
app.use(express.static(__dirname + "/public")); // What is this used for?

// Router
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Listener
app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});