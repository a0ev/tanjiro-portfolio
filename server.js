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

// استخدام process.cwd() كضمن أن Vercel يلقى مجلد public فالمجلد الرئيسي
app.use(express.static(path.join(process.cwd(), "public")));

// السيرفر هو لي غادي يصيفط index.html فالمسار الرئيسي
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.use("/api/contact", require("./routes/contact"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});