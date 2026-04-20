import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      message: "❌ Hanya POST"
    });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({
      status: "error",
      message: "❌ Data tidak lengkap"
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

    return res.status(200).json({
      status: "success",
      message: "✅ Email terkirim"
    });

  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message
    });
  }
}
