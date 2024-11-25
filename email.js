import express from "express";
import bodyParser from "body-parser";
//import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer"

const app = express();
const port = 5000;

//middlewares
app.use(bodyParser.json());
app.use(cors());

//endpoint to send mail\


app.post("/send-email", async(req,res) =>{

  const {
    firstName,
    lastName,
    website,
    email,
    phone,
    company,
    state,
    howCanWeHelp,
    howDidYouHear,
  } = req.body;

  //creating the html content
  const emailHtml = `<!DOCTYPE html>
      <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
            font-family: Arial, sans-serif;
          }
          th, td {
            border: 1px solid #ddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        </style>
      </head>
      <body>
        <h1>Hello!<h1>
        <h4>We recieved the contact informatoin form user ${firstName} ${lastName}<h4>
        <h3>Contact Information</h4>
        <table>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>First Name</td>
            <td>${firstName}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>${lastName}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>${website}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>${email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>${phone}</td>
          </tr>
          <tr>
            <td>Company</td>
            <td>${company}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>${state}</td>
          </tr>
          <tr>
            <td>How Can We Help?</td>
            <td>${howCanWeHelp}</td>
          </tr>
          <tr>
            <td>How Did You Hear About Us?</td>
            <td>${howDidYouHear}</td>
          </tr>
        </table>
        <h1>Thank You !<h1>
      </body>
      </html>`;


   const transport =  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
   });

   try {
    // Sending Email
    const info = await transport.sendMail({
      from: `${email}` ,   //senders address
      to: 'yepitsansh2@gmail.com', // comapny mail address
      subject: `Contact information from ${firstName}`,
      html: emailHtml,
    });

    console.log("Email sent:", info.messageId);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
  
   
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

export default app;