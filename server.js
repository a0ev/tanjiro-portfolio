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

// تقديم الملفات الساكنة من مجلد public
app.use(express.static(path.join(__dirname, "public")));

// الـ API ديالك
app.use("/api/contact", require("./routes/contact"));

// أي مسار آخر يدخل ليه المستخدم، صيفط ليه ملف index.html ديريكت
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});