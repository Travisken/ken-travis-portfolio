// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
  }

  try {
    // Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // e.g., contact.yoursite@gmail.com
        pass: process.env.GMAIL_APP_PASS, // Gmail App Password
      },
    });

    // Send email
    await transporter.sendMail({
        from: `"Your PortFolio" <${process.env.GMAIL_USER}>`, // your Gmail
  replyTo: `${email}`, // user's email
  to: "kentravis37@gmail.com",
  subject: "New Contact Submission",
  text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
