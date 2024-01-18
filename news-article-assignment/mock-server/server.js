const apiMocker = require("connect-api-mocker");
const express = require("express");
const cors = require("cors");

const PORT = 9000;
const app = express();

// Enable CORS for all routes
app.use(cors());

// Use connect-api-mocker for API mocking
app.use("/api", apiMocker("data"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${ PORT }`);
});
