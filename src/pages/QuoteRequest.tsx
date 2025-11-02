import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Car, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { VehicleData } from "./VehicleFinder";

const quoteFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter a valid phone number"),
  zipCode: z.string().regex(/^\d{5}$/, "Please enter a valid 5-digit zip code"),
  preferredContact: z.enum(["email", "phone"]),
  bestTime: z.string().optional(),
  quantity: z.number().min(1).max(8),
  installation: z.boolean(),
  notes: z.string().max(1000, "Notes must be less than 1000 characters").optional(),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const QuoteRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const vehicleData = location.state?.vehicleData as VehicleData;
  const tireSize = location.state?.tireSize as string;
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      quantity: 4,
      installation: true,
      preferredContact: "email",
      terms: false,
    },
  });

  const installation = watch("installation");
  const terms = watch("terms");

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      // Generate reference number
      const referenceNumber = `TS-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Save quote to database
      const { error: quoteError } = await supabase
        .from('quotes')
        .insert({
          reference_number: referenceNumber,
          customer_name: data.fullName,
          customer_email: data.email,
          customer_phone: data.phone,
          zip_code: data.zipCode,
          vehicle_year: parseInt(vehicleData.year),
          vehicle_make: vehicleData.make,
          vehicle_model: vehicleData.model,
          vehicle_trim: vehicleData.trim,
          tire_size: tireSize,
          quantity: data.quantity,
          installation_required: data.installation,
          preferred_contact_method: data.preferredContact,
          best_contact_time: data.bestTime || null,
          additional_notes: data.notes || null,
          user_id: null, // Explicitly set to null for anonymous submissions
        })


      if (quoteError) {
        console.error('Error saving quote:', quoteError);
        console.error('Error details:', JSON.stringify(quoteError, null, 2));
        console.error('Error code:', quoteError.code);
        console.error('Error hint:', quoteError.hint);
        throw new Error(`Failed to save quote request: ${quoteError.message || 'Unknown error'}`);
      }
      console.log('Quote saved successfully with reference:', referenceNumber);
      
      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-quote-email', {
        body: {
          customerName: data.fullName,
          customerEmail: data.email,
          referenceNumber,
          vehicleYear: parseInt(vehicleData.year),
          vehicleMake: vehicleData.make,
          vehicleModel: vehicleData.model,
          vehicleTrim: vehicleData.trim,
          tireSize,
          quantity: data.quantity,
        },
      });

      if (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the whole operation if email fails
      }

      const completeQuoteData = {
        ...data,
        vehicleData,
        tireSize,
        referenceNumber,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem("lastQuote", JSON.stringify(completeQuoteData));
      
      toast({
        title: "Quote Request Submitted!",
        description: `Reference: ${referenceNumber}`,
      });
      
      navigate("/confirmation", { state: { quoteData: completeQuoteData } });
    } catch (error: any) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!vehicleData || !tireSize) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Vehicle Selected</h2>
          <p className="text-muted-foreground mb-6">
            Please complete the tire finder first.
          </p>
          <Link to="/finder">
            <Button variant="accent">Start Tire Finder</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/src/assets/wheels-deals-logo.png" alt="Wheels & Deals Auto & Services" className="h-12" />
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Request Your Quote</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        {...register("fullName")}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          {...register("phone")}
                          placeholder="(555) 123-4567"
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="zipCode">Zip Code *</Label>
                      <Input
                        id="zipCode"
                        {...register("zipCode")}
                        placeholder="12345"
                        maxLength={5}
                      />
                      {errors.zipCode && (
                        <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>
                      )}
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-3 block">Preferred Contact Method *</Label>
                      <RadioGroup
                        defaultValue="email"
                        onValueChange={(value) => setValue("preferredContact", value as "email" | "phone")}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email-contact" />
                          <Label htmlFor="email-contact" className="font-normal cursor-pointer">
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone" id="phone-contact" />
                          <Label htmlFor="phone-contact" className="font-normal cursor-pointer">
                            Phone
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="bestTime">Best Time to Contact</Label>
                      <Input
                        id="bestTime"
                        {...register("bestTime")}
                        placeholder="Morning, Afternoon, Evening"
                      />
                    </div>

                    <div>
                      <Label htmlFor="quantity">Number of Tires Needed *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        {...register("quantity", { valueAsNumber: true })}
                        min="1"
                        max="8"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="installation"
                        checked={installation}
                        onCheckedChange={(checked) => setValue("installation", checked as boolean)}
                      />
                      <Label htmlFor="installation" className="font-normal cursor-pointer">
                        I need installation services
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes or Questions</Label>
                      <Textarea
                        id="notes"
                        {...register("notes")}
                        placeholder="Any special requests or questions..."
                        rows={4}
                      />
                      {errors.notes && (
                        <p className="text-sm text-destructive mt-1">{errors.notes.message}</p>
                      )}
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={terms}
                      onCheckedChange={(checked) => setValue("terms", checked as boolean)}
                    />
                    <Label htmlFor="terms" className="font-normal cursor-pointer text-sm">
                      I agree to the terms and conditions and privacy policy. I understand that this 
                      is a quote request and not a final purchase. *
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-destructive mt-2">{errors.terms.message}</p>
                  )}
                </Card>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                  <ArrowRight className="ml-2" />
                </Button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 shadow-card sticky top-4">
                <h3 className="font-semibold mb-4">Quote Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {vehicleData.year} {vehicleData.make}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {vehicleData.model} {vehicleData.trim}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-1">Tire Size</p>
                    <p className="text-2xl font-bold text-accent">{tireSize}</p>
                  </div>

                  <div className="pt-4 border-t bg-accent/5 -mx-6 px-6 py-4 rounded-b-lg">
                    <p className="text-sm font-medium mb-2">What happens next?</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• You'll receive a confirmation email</li>
                      <li>• We'll review your request</li>
                      <li>• Get a quote within 2 business hours</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;
