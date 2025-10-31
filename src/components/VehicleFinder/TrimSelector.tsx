import { Button } from "@/components/ui/button";

interface TrimSelectorProps {
  year: string;
  make: string;
  model: string;
  selectedTrim: string;
  onSelect: (trim: string) => void;
}

const TrimSelector = ({ year, make, model, selectedTrim, onSelect }: TrimSelectorProps) => {
  // For demo purposes, we'll show common trim levels
  // In production, this would fetch from NHTSA API or database
  const commonTrims = [
    "Base",
    "LX",
    "EX",
    "EX-L",
    "Touring",
    "Sport",
    "Limited",
    "Premium",
    "SE",
    "SL",
    "SV",
    "Platinum",
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select the trim level that matches your vehicle. If you're unsure, check your vehicle registration or owner's manual.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {commonTrims.map((trim) => (
          <Button
            key={trim}
            variant={selectedTrim === trim ? "accent" : "outline"}
            onClick={() => onSelect(trim)}
            className="h-14 text-base font-semibold"
          >
            {trim}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TrimSelector;
