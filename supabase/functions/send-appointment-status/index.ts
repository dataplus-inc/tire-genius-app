import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AppointmentStatusRequest {
  customerName: string;
  customerEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  services: string[];
  status: "approved" | "declined";
  adminNotes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customerName,
      customerEmail,
      appointmentDate,
      appointmentTime,
      services,
      status,
      adminNotes,
    }: AppointmentStatusRequest = await req.json();

    console.log(`Sending appointment ${status} email to customer`);

    const isApproved = status === "approved";
    const subject = isApproved 
      ? "Your Appointment is Confirmed!" 
      : "Update on Your Appointment Request";

    const emailResponse = await resend.emails.send({
      from: "Wheels & Deals <onboarding@resend.dev>",
      to: [customerEmail],
      subject: subject,
      html: `
        <h1>${isApproved ? "Appointment Confirmed!" : "Appointment Update"}</h1>
        <p>Dear ${customerName},</p>
        
        ${isApproved 
          ? `<p>Great news! Your appointment has been <strong>confirmed</strong>.</p>` 
          : `<p>Thank you for your interest. Unfortunately, we are unable to accommodate your appointment request at this time.</p>`
        }
        
        <h2>Appointment Details</h2>
        <p><strong>Date:</strong> ${appointmentDate}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
        
        <h2>Services</h2>
        <ul>
          ${services.map(service => `<li>${service}</li>`).join('')}
        </ul>
        
        ${adminNotes ? `
          <h2>Additional Information</h2>
          <p>${adminNotes}</p>
        ` : ''}
        
        ${isApproved 
          ? `<p style="margin-top: 20px;">We look forward to seeing you! If you need to make any changes, please contact us as soon as possible.</p>` 
          : `<p style="margin-top: 20px;">We apologize for any inconvenience. Please feel free to submit another request for a different date and time, or contact us directly for assistance.</p>`
        }
        
        <p>Best regards,<br>Wheels & Deals Team</p>
      `,
    });

    console.log("Appointment status email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-appointment-status function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
