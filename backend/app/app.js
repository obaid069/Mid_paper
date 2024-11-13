const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const CONFIG = require("./config");
const ClassRoutes = require("./api/routes/ClassRoutes");
const StudentRoutes = require("./api/routes/StudentRoutes");
const TeacherRoutes = require("./api/routes/TeacherRoutes");

// ****************************************
// SETTING UP THE APP
// ****************************************
const app = express();
app.use(express.urlencoded({ extended: false })); // Parse application/xxx-www-url form encoded
app.use(express.json()); // parse application/json
app.use(cors());

// ****************************************
// SETTING UP LOGGER
// ****************************************
app.use(morgan("dev"));

// ****************************************
// API routes
// ****************************************
app.use("/class", ClassRoutes);
app.use("/student", StudentRoutes);
app.use("/teacher", TeacherRoutes);

// Start the server
console.log("Starting server...");
app.listen(CONFIG.PORT, () => {
  console.log(`\t.. Server started and listening on port ${CONFIG.PORT}!`);
});
