const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const cors = require("cors")

app.use(cors({
    origin: "*"
}))

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/employer", require("./routes/employerRoutes"));

app.get("/", (req, res) => {
    res.send("Leave Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});