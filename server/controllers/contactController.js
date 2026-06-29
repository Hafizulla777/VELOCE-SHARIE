const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message.'
      });
    }

    // Create Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Veloce Share Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends to your inbox
      replyTo: email, // Allows you to reply directly to the customer
      subject: `Veloce Share Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px; border: 1px solid #333; border-radius: 10px;">
          <h1 style="color: #FF5A1F; margin-bottom: 20px;">New Contact Form Submission</h1>
          <div style="background-color: #141414; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <table style="width: 100%; color: #cccccc; font-size: 14px;">
              <tr>
                <td style="padding: 10px; color: #888;">Name:</td>
                <td style="padding: 10px; color: #fff; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #888;">Email:</td>
                <td style="padding: 10px; color: #fff;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #888;">Phone:</td>
                <td style="padding: 10px; color: #fff;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #888;">Subject:</td>
                <td style="padding: 10px; color: #FF5A1F; font-weight: bold;">${subject || 'General Inquiry'}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #141414; padding: 20px; border-radius: 8px;">
            <p style="color: #888; margin-bottom: 10px; font-size: 14px;">Message:</p>
            <p style="color: #ffffff; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #555; font-size: 12px; margin-top: 30px; text-align: center;">Sent from Veloce Share Contact Form</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Email Error:', error);
    
    // Handle specific Gmail auth errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please check your App Password.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
};

module.exports = { sendContactEmail };