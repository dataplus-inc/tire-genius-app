import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// HTML escape utility to prevent XSS
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Validation schema
const appointmentNotificationSchema = z.object({
  customerName: z.string().trim().min(1).max(100),
  customerEmail: z.string().trim().email().max(255),
  customerPhone: z.string().trim().min(10).max(20),
  appointmentDate: z.string().trim().min(1).max(50),
  appointmentTime: z.string().trim().min(1).max(50),
  services: z.array(z.string().trim().min(1).max(100)).min(1).max(20),
  vehicleInfo: z.string().trim().max(200).optional(),
  additionalNotes: z.string().trim().max(1000).optional(),
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate input
    const validationResult = appointmentNotificationSchema.safeParse(rawData);
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error);
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: validationResult.error.issues }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      appointmentDate,
      appointmentTime,
      services,
      vehicleInfo,
      additionalNotes,
    } = validationResult.data;

    console.log("Sending appointment notification email");

    // IMPORTANT: Resend test mode limitation - emails can only be sent to ward.dataplus@gmail.com
    // To send to other emails, verify a domain at https://resend.com/domains
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Wheels & Deals <onboarding@resend.dev>",
        to: ["ward.dataplus@gmail.com"], // Your verified email (Resend limitation in test mode)
        subject: `New Appointment Request from ${customerName}`,
        html: `
          <h1>New Appointment Request</h1>
          <h2>Customer Information</h2>
          <p><strong>Name:</strong> ${escapeHtml(customerName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(customerEmail)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(customerPhone)}</p>
          
          <h2>Appointment Details</h2>
          <p><strong>Date:</strong> ${escapeHtml(appointmentDate)}</p>
          <p><strong>Time:</strong> ${escapeHtml(appointmentTime)}</p>
          
          <h2>Services Requested</h2>
          <ul>
            ${services.map(service => `<li>${escapeHtml(service)}</li>`).join('')}
          </ul>
          
          ${vehicleInfo ? `<p><strong>Vehicle:</strong> ${escapeHtml(vehicleInfo)}</p>` : ''}
          ${additionalNotes ? `<p><strong>Notes:</strong> ${escapeHtml(additionalNotes)}</p>` : ''}
          
          <p style="margin-top: 20px;">Please review and respond to this appointment request from the admin dashboard.</p>
        `,
      }),
    });

    const data = await emailResponse.json();

    console.log("Appointment notification email sent successfully:", data);

    return new Response(JSON.stringify(data), {
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
