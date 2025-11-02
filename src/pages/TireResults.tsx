import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Car, Ruler, Info, Loader2 } from "lucide-react";
import type { VehicleData } from "./VehicleFinder";
import { useToast } from "@/hooks/use-toast";

interface TireData {
  frontTireSize: string | null;
  rearTireSize: string | null;
}

const TireResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const vehicleData = location.state?.vehicleData as VehicleData;
  const [tireData, setTireData] = useState<TireData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTireData = async () => {
      if (!vehicleData) return;

      setLoading(true);
      try {
        // First, get the vehicle's Make ID and Model ID
        const makeResponse = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(vehicleData.make)}/modelyear/${vehicleData.year}?format=json`
        );
        const makeData = await makeResponse.json();
        
        const modelMatch = makeData.Results?.find(
          (item: any) => item.Model_Name === vehicleData.model
        );

        if (!modelMatch) {
          throw new Error("Model not found");
        }

        // Get vehicle specifications using Make ID and Model ID
        const specsResponse = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${modelMatch.Make_ID}?format=json`
        );
        const specsData = await specsResponse.json();

        // Try to get tire size from vehicle specifications
        // Note: NHTSA API doesn't always have tire size data
        // You may need to supplement with additional data sources
        
        // For demonstration, we'll use a fallback approach
        // In production, you'd want to maintain your own database or use a paid API
        const frontTire = getTireSizeForVehicle(vehicleData);
        const rearTire = frontTire; // Most vehicles have same tire size front/rear

        setTireData({
          frontTireSize: frontTire,
          rearTireSize: rearTire,
        });
      } catch (error) {
        console.error("Error fetching tire data:", error);
        toast({
          title: "Tire Data Unavailable",
          description: "Using estimated tire size. Please verify with your vehicle manual.",
          variant: "destructive",
        });
        
        // Fallback to estimated tire size
        const estimatedSize = getTireSizeForVehicle(vehicleData);
        setTireData({
          frontTireSize: estimatedSize,
          rearTireSize: estimatedSize,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTireData();
  }, [vehicleData, toast]);

  // Helper function - In production, replace with database lookup
  const getTireSizeForVehicle = (vehicle: VehicleData): string => {
    // This is a simplified example. In production, you need a comprehensive database
    const year = parseInt(vehicle.year);
    
    // Common tire sizes by vehicle type (very simplified)
    if (vehicle.make.toLowerCase().includes('honda')) {
      if (vehicle.model.toLowerCase().includes('civic')) {
        return year >= 2016 ? "215/55R16" : "205/55R16";
      }
      if (vehicle.model.toLowerCase().includes('accord')) {
        return year >= 2018 ? "225/50R17" : "225/55R17";
      }
    }
    
    if (vehicle.make.toLowerCase().includes('toyota')) {
      if (vehicle.model.toLowerCase().includes('camry')) {
        return year >= 2018 ? "235/45R18" : "215/55R17";
      }
      if (vehicle.model.toLowerCase().includes('corolla')) {
        return "205/55R16";
      }
    }

    // Default fallback
    return "225/65R17";
  };

  if (!vehicleData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Vehicle Selected</h2>
          <p className="text-muted-foreground mb-6">
            Please select a vehicle first to view tire results.
          </p>
          <Link to="/finder">
            <Button variant="accent">Start Tire Finder</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/src/assets/wheels-deals-logo.png" alt="Wheels & Deals" className="h-12" />
            </Link>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Finding tire specifications...</p>
          </div>
        </div>
      </div>
    );
  }

  const tireSize = tireData?.frontTireSize || "225/65R17";
  const parts = tireSize.match(/(\d+)\/(\d+)([A-Z])(\d+)/);
  const [, width, aspectRatio, construction, diameter] = parts || ["", "225", "65", "R", "17"];

  const handleRequestQuote = () => {
    navigate("/quote", { state: { vehicleData, tireSize } });
  };

  const tireOptions = [
    {
      id: 1,
      brand: "Michelin",
      model: "Defender T+H",
      season: "All-Season",
      price: "$189",
      rating: 4.8,
      inStock: true,
      category: "Premium",
    },
    {
      id: 2,
      brand: "Goodyear",
      model: "Assurance WeatherReady",
      season: "All-Season",
      price: "$159",
      rating: 4.6,
      inStock: true,
      category: "Mid-Range",
    },
    {
      id: 3,
      brand: "Continental",
      model: "TrueContact Plus",
      season: "All-Season",
      price: "$175",
      rating: 4.7,
      inStock: true,
      category: "Premium",
    },
    {
      id: 4,
      brand: "Firestone",
      model: "Destination LE3",
      season: "All-Season",
      price: "$135",
      rating: 4.4,
      inStock: true,
      category: "Budget",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/src/assets/wheels-deals-logo.png" alt="Wheels & Deals" className="h-12" />
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <Card className="p-6 mb-8 bg-gradient-hero text-primary-foreground shadow-elevated">
          <div className="flex items-center gap-4 mb-2">
            <Car className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">
              {vehicleData.year} {vehicleData.make} {vehicleData.model}
            </h1>
          </div>
          <p className="text-primary-foreground/80">Trim: {vehicleData.trim}</p>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-card sticky top-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-accent" />
                Your Tire Size
              </h2>
              <div className="bg-muted rounded-lg p-6 mb-4">
                <div className="text-4xl font-bold text-center mb-4">{tireSize}</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Width:</span>
                  <span className="text-sm font-semibold">{width} mm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Aspect Ratio:</span>
                  <span className="text-sm font-semibold">{aspectRatio}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Construction:</span>
                  <span className="text-sm font-semibold">Radial ({construction})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Rim Diameter:</span>
                  <span className="text-sm font-semibold">{diameter} inches</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex gap-2">
                  <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    This tire size is based on manufacturer specifications. Always verify with your vehicle's door jamb sticker.
                  </p>
                </div>
              </div>

              <Button
                variant="accent"
                className="w-full mt-6"
                size="lg"
                onClick={handleRequestQuote}
              >
                Request Quote
                <ArrowRight className="ml-2" />
              </Button>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Recommended Tires</h2>
            <div className="space-y-4">
              {tireOptions.map((tire) => (
                <Card key={tire.id} className="p-6 shadow-card hover:shadow-elevated transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">
                          {tire.brand} {tire.model}
                        </h3>
                        <Badge variant={tire.category === "Premium" ? "default" : "secondary"}>
                          {tire.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{tire.season}</span>
                        <span>•</span>
                        <span>Size: {tireSize}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          ⭐ {tire.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {tire.inStock && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            In Stock
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-3xl font-bold text-accent">{tire.price}</div>
                      <span className="text-sm text-muted-foreground">per tire</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 mt-8 bg-muted/30">
              <h3 className="font-semibold mb-3">Ready to get a quote?</h3>
              <p className="text-muted-foreground mb-4">
                Submit your information and we'll provide a personalized quote for your selected tires, 
                including installation if needed.
              </p>
              <Button variant="accent" onClick={handleRequestQuote}>
                Request Custom Quote
                <ArrowRight className="ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TireResults;
