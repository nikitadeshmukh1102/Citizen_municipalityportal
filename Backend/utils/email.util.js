import nodemailer from 'nodemailer';

export const sendResetEmail = async (email, token) => {

  try {

    console.log("EMAIL_USER →", process.env.EMAIL_USER);
    console.log("EMAIL_PASS →", process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,   
        pass: process.env.EMAIL_PASS    
      }
    });

    const resetLink = `http://192.168.1.5:5173/reset-password/${token}`;


    await transporter.sendMail({
      from: `"CRP Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset</h2>
        <p>Click below link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `
    });

    console.log("✅ RESET EMAIL SENT");

  } catch (err) {

    console.error("❌ EMAIL ERROR:", err);
  }
};
