import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Mail, Phone, MapPin, Car, Calendar, CheckCircle2, Send } from "lucide-react";

interface Quote {
  id: string;
  reference_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  zip_code: string;
  vehicle_year: number;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_trim: string;
  tire_size: string;
  quantity: number;
  installation_required: boolean;
  wheel_alignment: boolean;
  oil_change: boolean;
  preferred_contact_method: string;
  best_contact_time: string | null;
  additional_notes: string | null;
  status: string;
  quote_amount: number | null;
  quote_notes: string | null;
  created_at: string;
  updated_at: string;
}

const QuoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"new" | "contacted" | "quoted" | "completed" | "declined">("new");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    checkAuthAndFetchQuote();
  }, [id]);

  const checkAuthAndFetchQuote = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/auth");
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roleData) {
        navigate("/");
        return;
      }

      fetchQuote();
    } catch (error) {
      console.error('Auth error:', error);
      navigate("/auth");
    }
  };

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setQuote(data);
      setStatus(data.status as "new" | "contacted" | "quoted" | "completed" | "declined");
      setQuoteAmount(data.quote_amount?.toString() || "");
      setQuoteNotes(data.quote_notes || "");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load quote details.",
        variant: "destructive",
      });
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuote = async () => {
    if (!quote) return;

    try {
      const { error } = await supabase
        .from('quotes')
        .update({
          status,
          quote_amount: quoteAmount ? parseFloat(quoteAmount) : null,
          quote_notes: quoteNotes || null,
        })
        .eq('id', quote.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Quote updated successfully.",
      });

      fetchQuote();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update quote.",
        variant: "destructive",
      });
    }
  };

  const handleSendQuote = async () => {
    if (!quote || !quoteAmount) {
      toast({
        title: "Missing Information",
        description: "Please enter a quote amount before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      // First update the quote
      await handleUpdateQuote();

      // Then send the email
      const { error } = await supabase.functions.invoke('send-customer-quote', {
        body: {
          customerName: quote.customer_name,
          customerEmail: quote.customer_email,
          referenceNumber: quote.reference_number,
          vehicleYear: quote.vehicle_year,
          vehicleMake: quote.vehicle_make,
          vehicleModel: quote.vehicle_model,
          vehicleTrim: quote.vehicle_trim,
          tireSize: quote.tire_size,
          quantity: quote.quantity,
          installation: quote.installation_required,
          wheelAlignment: quote.wheel_alignment,
          oilChange: quote.oil_change,
          quoteAmount: parseFloat(quoteAmount),
          quoteNotes: quoteNotes || undefined,
        },
      });

      if (error) throw error;

      // Update status to quoted
      await supabase
        .from('quotes')
        .update({ status: 'quoted' })
        .eq('id', quote.id);

      toast({
        title: "Quote Sent!",
        description: `Quote sent successfully to ${quote.customer_email}`,
      });

      fetchQuote();
    } catch (error: any) {
      console.error('Error sending quote:', error);
      toast({
        title: "Error",
        description: "Failed to send quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!quote) return null;

  const services = [];
  if (quote.installation_required) services.push("Tire Installation");
  if (quote.wheel_alignment) services.push("Wheel Alignment");
  if (quote.oil_change) services.push("Oil Change");

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/admin" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Quote Details</h1>
              <p className="text-muted-foreground">Reference: {quote.reference_number}</p>
            </div>
            <Badge variant={quote.status === 'completed' ? 'default' : 'secondary'} className="text-lg px-4 py-2">
              {quote.status}
            </Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-semibold">{quote.customer_name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{quote.customer_name}</p>
                      <p className="text-sm text-muted-foreground">Customer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5" />
                    <span>{quote.customer_email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5" />
                    <span>{quote.customer_phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>{quote.zip_code}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground mb-1">Preferred Contact</p>
                    <p className="font-medium capitalize">{quote.preferred_contact_method}</p>
                    {quote.best_contact_time && (
                      <p className="text-sm text-muted-foreground mt-1">Best time: {quote.best_contact_time}</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Vehicle & Service Details */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Vehicle & Service Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Car className="w-6 h-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold text-lg">
                        {quote.vehicle_year} {quote.vehicle_make} {quote.vehicle_model}
                      </p>
                      <p className="text-muted-foreground">{quote.vehicle_trim}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tire Size</p>
                      <p className="text-2xl font-bold text-accent">{quote.tire_size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                      <p className="text-2xl font-bold">{quote.quantity} tires</p>
                    </div>
                  </div>
                  {services.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Requested Services</p>
                      <div className="flex flex-wrap gap-2">
                        {services.map((service) => (
                          <Badge key={service} variant="outline" className="gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {quote.additional_notes && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Customer Notes</p>
                      <p className="text-sm bg-muted p-3 rounded">{quote.additional_notes}</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Quote Management */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Manage Quote</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={(value) => setStatus(value as "new" | "contacted" | "quoted" | "completed" | "declined")}>
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="declined">Declined</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="amount">Quote Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={quoteAmount}
                      onChange={(e) => setQuoteAmount(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Quote Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any notes about the quote..."
                      rows={4}
                      value={quoteNotes}
                      onChange={(e) => setQuoteNotes(e.target.value)}
                    />
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button onClick={handleUpdateQuote} className="w-full" variant="outline">
                      Save Changes
                    </Button>
                    <Button 
                      onClick={handleSendQuote} 
                      className="w-full" 
                      variant="accent"
                      disabled={isSending || !quoteAmount}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSending ? "Sending..." : "Send Quote to Customer"}
                    </Button>
                  </div>

                  <div className="pt-4 border-t text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {new Date(quote.created_at).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Updated: {new Date(quote.updated_at).toLocaleString()}</span>
                    </div>
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

export default QuoteDetail;
