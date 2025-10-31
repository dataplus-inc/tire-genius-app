import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MakeSelectorProps {
  year: string;
  selectedMake: string;
  onSelect: (make: string) => void;
}

const MakeSelector = ({ year, selectedMake, onSelect }: MakeSelectorProps) => {
  const [makes, setMakes] = useState<string[]>([]);
  const [filteredMakes, setFilteredMakes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMakes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?year=${year}&format=json`
        );
        const data = await response.json();
        
        if (data.Results) {
          const makeList = data.Results.map((item: any) => item.MakeName).sort();
          setMakes(makeList);
          setFilteredMakes(makeList);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch vehicle makes. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (year) {
      fetchMakes();
    }
  }, [year, toast]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredMakes(
        makes.filter((make) =>
          make.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredMakes(makes);
    }
  }, [searchTerm, makes]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Search makes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
        {filteredMakes.map((make) => (
          <Button
            key={make}
            variant={selectedMake === make ? "accent" : "outline"}
            onClick={() => onSelect(make)}
            className="h-14 text-base font-semibold"
          >
            {make}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MakeSelector;
