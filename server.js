require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { helmet, limiter } = require("./middleware/security");

const app = express();

app.use(helmet());
app.use(limiter);

app.use(cors());
app.use(express.json());

// الـ API ديالك
app.use("/api/contact", require("./routes/contact"));

// مسار احتياطي للـ API فقط
app.get("/api", (req, res) => {
    res.json({ message: "API is running successfully!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});