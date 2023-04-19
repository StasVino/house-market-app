const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
PORT = process.env.PORT || 8000;

// Connect to database
connectDB();
const app = express();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: false, limit: "25mb" }));

app.get("/", (req, res) => {
  res.send("hello");
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
