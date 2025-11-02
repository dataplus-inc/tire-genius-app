import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import YearSelector from "@/components/VehicleFinder/YearSelector";
import MakeSelector from "@/components/VehicleFinder/MakeSelector";
import ModelSelector from "@/components/VehicleFinder/ModelSelector";
import TrimSelector from "@/components/VehicleFinder/TrimSelector";

export interface VehicleData {
  year: string;
  make: string;
  model: string;
  trim: string;
}

const VehicleFinder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    year: "",
    make: "",
    model: "",
    trim: "",
  });

  const updateVehicleData = (field: keyof VehicleData, value: string) => {
    setVehicleData((prev) => ({ ...prev, [field]: value }));
    // Save to localStorage
    const updated = { ...vehicleData, [field]: value };
    localStorage.setItem("vehicleSelection", JSON.stringify(updated));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Navigate to results page
      navigate("/results", { state: { vehicleData } });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return vehicleData.year !== "";
      case 2:
        return vehicleData.make !== "";
      case 3:
        return vehicleData.model !== "";
      case 4:
        return vehicleData.trim !== "";
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, label: "Year", completed: vehicleData.year !== "" },
    { number: 2, label: "Make", completed: vehicleData.make !== "" },
    { number: 3, label: "Model", completed: vehicleData.model !== "" },
    { number: 4, label: "Trim", completed: vehicleData.trim !== "" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xl">
              T
            </div>
            <span className="text-xl font-bold">Wheels & Deals Auto & Services</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
                      s.completed
                        ? "bg-gradient-accent text-accent-foreground shadow-md"
                        : step === s.number
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.completed ? <CheckCircle className="w-6 h-6" /> : s.number}
                  </div>
                  <span className="text-sm font-medium mt-2">{s.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        s.completed ? "bg-gradient-accent w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-elevated">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {step === 1 && "Select Vehicle Year"}
                {step === 2 && "Select Vehicle Make"}
                {step === 3 && "Select Vehicle Model"}
                {step === 4 && "Select Vehicle Trim"}
              </h1>
              <p className="text-muted-foreground">
                {step === 1 && "Choose the year your vehicle was manufactured"}
                {step === 2 && `Select the make for your ${vehicleData.year} vehicle`}
                {step === 3 && `Choose your ${vehicleData.year} ${vehicleData.make} model`}
                {step === 4 && `Select the trim level for your ${vehicleData.year} ${vehicleData.make} ${vehicleData.model}`}
              </p>
            </div>

            {step === 1 && (
              <YearSelector
                selectedYear={vehicleData.year}
                onSelect={(year) => updateVehicleData("year", year)}
              />
            )}
            {step === 2 && (
              <MakeSelector
                year={vehicleData.year}
                selectedMake={vehicleData.make}
                onSelect={(make) => updateVehicleData("make", make)}
              />
            )}
            {step === 3 && (
              <ModelSelector
                year={vehicleData.year}
                make={vehicleData.make}
                selectedModel={vehicleData.model}
                onSelect={(model) => updateVehicleData("model", model)}
              />
            )}
            {step === 4 && (
              <TrimSelector
                year={vehicleData.year}
                make={vehicleData.make}
                model={vehicleData.model}
                selectedTrim={vehicleData.trim}
                onSelect={(trim) => updateVehicleData("trim", trim)}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack} size="lg">
                  <ArrowLeft className="mr-2" />
                  Back
                </Button>
              )}
              <Button
                variant="accent"
                onClick={handleNext}
                disabled={!canProceed()}
                size="lg"
                className="flex-1"
              >
                {step === 4 ? "View Results" : "Next"}
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VehicleFinder;
