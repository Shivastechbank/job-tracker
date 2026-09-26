const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Database
require("./database/database");

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static("public"));

// Application routes
const applicationRoutes = require("./routes/applications");

app.use("/api/applications", applicationRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`JobTrack server running at http://localhost:${PORT}`);
});