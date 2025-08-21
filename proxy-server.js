// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
//Grab the .env file
dotenv.config(); 
//call express server
const app = express();
app.use(cors());
app.use(express.json());

// Call temeplate parameters using a POST method
app.post("/send-email", async (req, res) => {
  try {
    const { templateParams } = req.body;

    // Call EmailJS API securely with keys
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.EMAIL_JS_SERVICE_ID,
        template_id: process.env.EMAIL_JS_TEMPLATE_ID,
        user_id: process.env.EMAIL_JS_USER_ID,
        template_params: templateParams,
      }),
    });

    if (!response.ok) {
      throw new Error("EmailJS request failed");
    }

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 
