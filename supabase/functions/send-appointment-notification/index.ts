import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AppointmentNotificationRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  services: string[];
  vehicleInfo?: string;
  additionalNotes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      appointmentDate,
      appointmentTime,
      services,
      vehicleInfo,
      additionalNotes,
    }: AppointmentNotificationRequest = await req.json();

    console.log("Sending appointment notification email");

    // Send email to admin
    const emailResponse = await resend.emails.send({
      from: "Wheels & Deals <onboarding@resend.dev>",
      to: [customerEmail], // Send to customer's email for testing (Resend limitation)
      subject: "New Appointment Request",
      html: `
        <h1>New Appointment Request</h1>
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${customerPhone}</p>
        
        <h2>Appointment Details</h2>
        <p><strong>Date:</strong> ${appointmentDate}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
        
        <h2>Services Requested</h2>
        <ul>
          ${services.map(service => `<li>${service}</li>`).join('')}
        </ul>
        
        ${vehicleInfo ? `<p><strong>Vehicle:</strong> ${vehicleInfo}</p>` : ''}
        ${additionalNotes ? `<p><strong>Notes:</strong> ${additionalNotes}</p>` : ''}
        
        <p style="margin-top: 20px;">Please review and respond to this appointment request from the admin dashboard.</p>
      `,
    });

    console.log("Appointment notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-appointment-notification function:", error);
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
