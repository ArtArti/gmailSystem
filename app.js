require('dotenv').config();
const express = require('express');
const cors = require("cors");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Apply CORS middleware
app.use(
  cors({
    origin:"https://portfolio-henna-seven-79.vercel.app/", 
    methods: ['POST'], 
    credentials: true,
  })
)
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.SMTP_USERNAME,// Using environment variables
    pass: process.env.SMTP_PASSWORD, // Using environment variables
  },
});

app.post('/api/send', async (req, res) => {
  const { from, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: from, // Use the 'from' field from the form data
      to: process.env.SMTP_USERNAME, // Using environment variables
      subject: `New Contact Form Submission: ${subject}`,
      text: `From: ${from}\n\n${message}`,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending email:', error);
    res.sendStatus(500);
  }
});



module.exports = app;


