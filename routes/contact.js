const express = require("express");
const router = express.Router();
const db = require("../database/connection");

router.post("/", (req, res) => {
    console.log(req.body);
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  db.query(
    "INSERT INTO contacts (name,email,message) VALUES (?,?,?)",
    [name, email, message],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false
        });
      }

      res.json({
        success: true,
        message: "Message sent successfully"
      });
    }
  );
});

module.exports = router;