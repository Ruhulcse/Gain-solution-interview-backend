const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const studentRoutes = require("./router/studentsRoutes");
dotenv.config();
connectDB();
app.use(express.json());
//for solving cors origin access issue
app.use(cors());

//students api endpoint
app.use("/api/v1/students", studentRoutes);
const port = process.env.PORT;
console.log(port);
app.listen(port, console.log("server is running"));
