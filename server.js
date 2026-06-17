require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const { helmet, limiter } = require("./middleware/security");

const app = express();

app.use(helmet());
app.use(limiter);

app.use(cors());
app.use(express.json());

// 1. تصحيح اسم المجلد لـ "public" بحرف صغير (lowercase)
app.use(express.static(path.join(__dirname, "public")));

// 2. تعديل هاد المسار باش يصيفط ملف index.html عوض "Server Works!"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/contact", require("./routes/contact"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});