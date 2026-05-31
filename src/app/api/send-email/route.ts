import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, service, consultationMode, preferredDate, message } = body;

    // Validate inputs basic check
    if (!fullName || !phone || !email || !service || !preferredDate) {
      return NextResponse.json(
        { error: "Missing required enquiry details" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not defined. Email notifications are skipped.");
      return NextResponse.json({
        message: "Enquiry logged successfully (email skipped due to missing API key)",
      });
    }

    const resend = new Resend(apiKey);

    const formattedMode = consultationMode === "whatsapp" ? "WhatsApp Consultation" : "In-Clinic Visit";

    // 1. Send Alert Email to Clinic Admin
    await resend.emails.send({
      from: "Shamim Hair Stylist <onboarding@resend.dev>", // Default free sandbox sender
      to: "info@shamimhairclinic.com",
      subject: `New Lead: ${fullName} - ${service.replace("-", " ")}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded: 10px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Consultation Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1f2937; width: 150px;">Full Name:</td>
              <td style="padding: 8px 0; color: #4b5563;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">Phone:</td>
              <td style="padding: 8px 0; color: #4b5563;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">Email:</td>
              <td style="padding: 8px 0; color: #4b5563;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">Service Requested:</td>
              <td style="padding: 8px 0; color: #4b5563; text-transform: capitalize;">${service.replace("-", " ")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">Consultation Mode:</td>
              <td style="padding: 8px 0; color: #4b5563;">${formattedMode}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">Preferred Date:</td>
              <td style="padding: 8px 0; color: #4b5563;">${preferredDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1f2937; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0; color: #4b5563;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    // 2. Send Booking Confirmation Receipt to the Client
    await resend.emails.send({
      from: "Shamim Hair Stylist <onboarding@resend.dev>",
      to: email,
      subject: "We Received Your Hair Restoration Consultation Request!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <div style="text-align: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: bold; font-family: 'Playfair Display', serif;">SHAMIM HAIR STYLIST</h1>
            <p style="color: #d4af37; margin: 5px 0 0 0; text-transform: uppercase; font-size: 11px; letter-spacing: 2px;">Premium Hair Restoration</p>
          </div>
          <p style="color: #374151; font-size: 16px; line-height: 1.5;">Hello ${fullName},</p>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Thank you for booking a free scalp and hair restoration consultation with us. We have received your request, and our hair care specialist will contact you on your registered number <strong>${phone}</strong> shortly to confirm your exact appointment timeslot.
          </p>
          <div style="background-color: #f8f8f6; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
            <h3 style="color: #0f172a; margin: 0 0 10px 0; font-size: 14px; font-weight: bold;">Your Request Summary</h3>
            <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 13px; line-height: 1.6;">
              <li><strong>Selected Service:</strong> <span style="text-transform: capitalize;">${service.replace("-", " ")}</span></li>
              <li><strong>Consultation Mode:</strong> ${formattedMode}</li>
              <li><strong>Requested Date:</strong> ${preferredDate}</li>
            </ul>
          </div>
          <p style="color: #4b5563; font-size: 13px; line-height: 1.5;">
            If you need instant assistance or would like to send us photos of your current hair patterns immediately, please click the link below to chat with our specialist on WhatsApp:
          </p>
          <p style="text-align: center; margin: 25px 0;">
            <a href="https://wa.me/917903817049?text=Hello%2C%20I%20just%20submitted%20my%20hair%20patch%20enquiry%20form%20online." style="background-color: #0f172a; color: #ffffff; padding: 12px 30px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 12px; text-transform: uppercase; border: 1px solid #d4af37;">
              Chat on WhatsApp Now
            </a>
          </p>
          <p style="color: #9ca3af; font-size: 11px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 25px;">
            &copy; ${new Date().getFullYear()} Shamim Hair Stylist. All rights reserved.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Enquiry notification emails sent successfully." });
  } catch (error: any) {
    console.error("API send-email error:", error);
    // Gracefully report failure to client but return 500 status so client can handle it or continue
    return NextResponse.json(
      { error: "Failed to dispatch notification emails", details: error.message },
      { status: 500 }
    );
  }
}
