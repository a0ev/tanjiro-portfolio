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

// خلي هادي للاحتياط
app.use(express.static(path.join(__dirname, "public")));

// حيدنا app.get("/") حيت Vercel غيتكلف بيه ديريكت من المجلد public
app.use("/api/contact", require("./routes/contact"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});