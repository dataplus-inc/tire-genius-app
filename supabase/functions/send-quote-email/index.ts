import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  customerName: string;
  customerEmail: string;
  referenceNumber: string;
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  vehicleTrim: string;
  tireSize: string;
  quantity: number;
  installation?: boolean;
  wheelAlignment?: boolean;
  oilChange?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customerName,
      customerEmail,
      referenceNumber,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      vehicleTrim,
      tireSize,
      quantity,
      installation,
      wheelAlignment,
      oilChange,
    }: QuoteEmailRequest = await req.json();

    console.log("Sending quote confirmation email to:", customerEmail);

    // Build services list
    const services = [];
    if (installation) services.push("Tire Installation");
    if (wheelAlignment) services.push("Wheel Alignment");
    if (oilChange) services.push("Oil Change");

    const servicesHtml = services.length > 0
      ? `<div class="detail-row">
          <span class="detail-label">Requested Services:</span>
          <span class="detail-value">${services.join(", ")}</span>
        </div>`
      : "";

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Wheels & Deals Auto & Services <onboarding@resend.dev>",
        to: [customerEmail],
        subject: `Quote Request Received - ${referenceNumber}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .logo { width: 50px; height: 50px; background: linear-gradient(135deg, #ff6b35 0%, #ff8247 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                .reference { background: #fff; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; border-left: 4px solid #ff6b35; }
                .reference-number { font-size: 24px; font-weight: bold; color: #ff6b35; margin: 10px 0; }
                .details { background: #fff; padding: 20px; margin: 20px 0; border-radius: 8px; }
                .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e9ecef; }
                .detail-label { font-weight: 600; color: #6c757d; }
                .detail-value { color: #2d2d2d; }
                .next-steps { background: #fff4ed; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ff6b35; }
                .next-steps h3 { color: #ff6b35; margin-top: 0; }
                .next-steps ul { margin: 10px 0; padding-left: 20px; }
                .next-steps li { margin: 8px 0; }
                .footer { text-align: center; padding: 20px; color: #6c757d; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">T</div>
                  <h1 style="margin: 0; font-size: 28px;">Wheels & Deals Auto & Services</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">Quote Request Confirmed</p>
                </div>
                
                <div class="content">
                  <h2>Thank you, ${customerName}!</h2>
                  <p>We've received your tire quote request and our team is already reviewing it.</p>
                  
                  <div class="reference">
                    <p style="margin: 0; color: #6c757d; font-size: 14px;">Your Reference Number</p>
                    <div class="reference-number">${referenceNumber}</div>
                    <p style="margin: 0; color: #6c757d; font-size: 12px;">Save this number for your records</p>
                  </div>
                  
                  <div class="details">
                    <h3 style="margin-top: 0; color: #2d2d2d;">Quote Details</h3>
                    <div class="detail-row">
                      <span class="detail-label">Vehicle:</span>
                      <span class="detail-value">${vehicleYear} ${vehicleMake} ${vehicleModel}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Trim:</span>
                      <span class="detail-value">${vehicleTrim}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Tire Size:</span>
                      <span class="detail-value">${tireSize}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Quantity:</span>
                      <span class="detail-value">${quantity} tires</span>
                    </div>
                    ${servicesHtml}
                  </div>
                  
                  <div class="next-steps">
                    <h3>What Happens Next?</h3>
                    <ul>
                      <li>Our team will review your tire requirements</li>
                      <li>We'll prepare a detailed quote with pricing</li>
                      <li>You'll receive your quote within 24 hours</li>
                      <li>One of our specialists will contact you to discuss details</li>
                    </ul>
                  </div>
                  
                  <p style="margin: 20px 0; text-align: center;">
                    Questions? Contact us at <a href="tel:614-555-0123" style="color: #ff6b35;">614-555-0123</a>
                  </p>
                </div>
                
                <div class="footer">
                  <p>Wheels & Deals Auto & Services<br>
                  123 Main Street, Columbus, OH 43026</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();

    console.log("Email sent successfully:", emailData);

    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Wheels & Deals Auto & Services <onboarding@resend.dev>",
        to: ["ward.dataplus@gmail.com"], // Update with actual admin email
        subject: `New Quote Request - ${referenceNumber}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2d2d2d; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                .alert { background: #ff6b35; color: white; padding: 15px; margin: 20px 0; border-radius: 8px; text-align: center; font-weight: bold; }
                .details { background: #fff; padding: 20px; margin: 20px 0; border-radius: 8px; }
                .detail-row { padding: 8px 0; border-bottom: 1px solid #e9ecef; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0;">🔔 New Quote Request</h2>
                </div>
                <div class="content">
                  <div class="alert">Reference: ${referenceNumber}</div>
                  
                  <div class="details">
                    <h3 style="margin-top: 0;">Customer Information</h3>
                    <div class="detail-row"><strong>Name:</strong> ${customerName}</div>
                    <div class="detail-row"><strong>Email:</strong> ${customerEmail}</div>
                    
                    <h3 style="margin-top: 20px;">Vehicle Details</h3>
                    <div class="detail-row"><strong>Vehicle:</strong> ${vehicleYear} ${vehicleMake} ${vehicleModel} ${vehicleTrim}</div>
                    <div class="detail-row"><strong>Tire Size:</strong> ${tireSize}</div>
                    <div class="detail-row"><strong>Quantity:</strong> ${quantity} tires</div>
                    ${services.length > 0 ? `<div class="detail-row" style="border-bottom: none;"><strong>Services:</strong> ${services.join(", ")}</div>` : ''}
                  </div>
                  
                  <p style="text-align: center; margin-top: 30px;">
                    <a href="https://wheelsdealsauto.com/admin/quotes" style="background: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">View in Dashboard</a>
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    const adminEmailData = await adminEmailResponse.json();

    console.log("Admin notification sent:", adminEmailData);

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
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
