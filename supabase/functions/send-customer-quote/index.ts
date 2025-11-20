import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
const sendQuoteSchema = z.object({
  customerName: z.string().trim().min(1).max(100),
  customerEmail: z.string().trim().email().max(255),
  referenceNumber: z.string().trim().min(1).max(50),
  vehicleYear: z.number().int().min(1900).max(2100),
  vehicleMake: z.string().trim().min(1).max(50),
  vehicleModel: z.string().trim().min(1).max(50),
  vehicleTrim: z.string().trim().min(1).max(50),
  tireSize: z.string().trim().min(1).max(50),
  quantity: z.number().int().min(1).max(10),
  installation: z.boolean(),
  wheelAlignment: z.boolean(),
  oilChange: z.boolean(),
  quoteAmount: z.number().min(0).max(1000000),
  quoteNotes: z.string().trim().max(1000).optional(),
});

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate input
    const validationResult = sendQuoteSchema.safeParse(rawData);
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
      quoteAmount,
      quoteNotes,
    } = validationResult.data;

    console.log("Sending quote to customer:", customerEmail);

    // Build services list
    const services = [];
    if (installation) services.push("Tire Installation");
    if (wheelAlignment) services.push("Wheel Alignment");
    if (oilChange) services.push("Oil Change");

    const servicesHtml = services.length > 0
      ? `<div class="detail-row">
          <span class="detail-label">Services:</span>
          <span class="detail-value">${services.map(s => escapeHtml(s)).join(", ")}</span>
        </div>`
      : "";

    const notesHtml = quoteNotes
      ? `<div class="notes">
          <h3>Additional Notes</h3>
          <p>${escapeHtml(quoteNotes)}</p>
        </div>`
      : "";

    const emailResponse = await resend.emails.send({
      from: "Wheels & Deals Auto & Services <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Your Quote is Ready - ${referenceNumber}`,
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
              .price-banner { background: linear-gradient(135deg, #ff6b35 0%, #ff8247 100%); color: white; padding: 30px; margin: 20px 0; border-radius: 8px; text-align: center; }
              .price { font-size: 48px; font-weight: bold; margin: 10px 0; }
              .details { background: #fff; padding: 20px; margin: 20px 0; border-radius: 8px; }
              .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e9ecef; }
              .detail-label { font-weight: 600; color: #6c757d; }
              .detail-value { color: #2d2d2d; }
              .notes { background: #fff4ed; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ff6b35; }
              .notes h3 { color: #ff6b35; margin-top: 0; }
              .cta { text-align: center; margin: 30px 0; }
              .button { background: #ff6b35; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; }
              .footer { text-align: center; padding: 20px; color: #6c757d; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">W</div>
                <h1 style="margin: 0; font-size: 28px;">Wheels & Deals Auto & Services</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Quote is Ready!</p>
              </div>
              
              <div class="content">
                <h2>Hello ${escapeHtml(customerName)},</h2>
                <p>Great news! We've prepared your custom quote for your tire needs.</p>
                
                <div class="price-banner">
                  <p style="margin: 0; font-size: 16px; opacity: 0.9;">TOTAL QUOTE</p>
                  <div class="price">$${quoteAmount.toFixed(2)}</div>
                  <p style="margin: 0; font-size: 14px; opacity: 0.9;">Reference: ${escapeHtml(referenceNumber)}</p>
                </div>
                
                <div class="details">
                  <h3 style="margin-top: 0; color: #2d2d2d;">Quote Details</h3>
                  <div class="detail-row">
                    <span class="detail-label">Vehicle:</span>
                    <span class="detail-value">${vehicleYear} ${escapeHtml(vehicleMake)} ${escapeHtml(vehicleModel)} ${escapeHtml(vehicleTrim)}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Tire Size:</span>
                    <span class="detail-value">${escapeHtml(tireSize)}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Quantity:</span>
                    <span class="detail-value">${quantity} tires</span>
                  </div>
                  ${servicesHtml}
                </div>
                
                ${notesHtml}
                
                <div class="cta">
                  <p><strong>Ready to proceed?</strong></p>
                  <a href="tel:6148799212" class="button">Call (614) 879-9212</a>
                  <p style="margin-top: 15px; font-size: 14px; color: #6c757d;">
                    Or reply to this email to schedule your appointment
                  </p>
                </div>
                
                <p style="margin-top: 30px; font-size: 14px; color: #6c757d;">
                  This quote is valid for 7 days. Contact us at info@wheelsdealsauto.com or (614) 879-9212 with any questions.
                </p>
              </div>
              
              <div class="footer">
                <p>© 2025 Wheels & Deals Auto & Services. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Quote email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-customer-quote function:", error);
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
