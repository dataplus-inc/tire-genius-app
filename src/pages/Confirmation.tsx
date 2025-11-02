import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Clock, Car, Home } from "lucide-react";

const Confirmation = () => {
  const location = useLocation();
  const quoteData = location.state?.quoteData;

  if (!quoteData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Quote Found</h2>
          <p className="text-muted-foreground mb-6">
            Please submit a quote request first.
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
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 shadow-elevated text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-accent-foreground" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Quote Request Received!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for choosing Wheels & Deals Auto & Services
            </p>

            <Card className="p-6 bg-muted/30 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Your Reference Number</p>
              <p className="text-3xl font-bold text-accent">{quoteData.referenceNumber}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Save this number for your records
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-6 h-6 text-accent" />
                  <h3 className="font-semibold">Vehicle Details</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Vehicle: </span>
                    <span className="font-medium">
                      {quoteData.vehicleData.year} {quoteData.vehicleData.make} {quoteData.vehicleData.model}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Trim: </span>
                    <span className="font-medium">{quoteData.vehicleData.trim}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Tire Size: </span>
                    <span className="font-medium">{quoteData.tireSize}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Quantity: </span>
                    <span className="font-medium">{quoteData.quantity} tires</span>
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-accent" />
                  <h3 className="font-semibold">Contact Information</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Name: </span>
                    <span className="font-medium">{quoteData.fullName}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email: </span>
                    <span className="font-medium">{quoteData.email}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phone: </span>
                    <span className="font-medium">{quoteData.phone}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Zip Code: </span>
                    <span className="font-medium">{quoteData.zipCode}</span>
                  </p>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold mb-2">What Happens Next?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ You'll receive a confirmation email at {quoteData.email}</li>
                    <li>✓ Our team will review your tire requirements</li>
                    <li>✓ Expect a detailed quote within 2 business hours</li>
                    <li>✓ We'll contact you via {quoteData.preferredContact} with pricing and availability</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" size="lg">
                  <Home className="mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/finder">
                <Button variant="accent" size="lg">
                  Find More Tires
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 mt-6 bg-muted/30">
            <p className="text-sm text-center text-muted-foreground">
              Questions? Contact us at <span className="font-medium">info@wheelsdealsauto.com</span> or call{" "}
              <span className="font-medium">(614) 879-9212</span>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
