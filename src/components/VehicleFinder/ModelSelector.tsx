import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ModelSelectorProps {
  year: string;
  make: string;
  selectedModel: string;
  onSelect: (model: string) => void;
}

const ModelSelector = ({ year, make, selectedModel, onSelect }: ModelSelectorProps) => {
  const [models, setModels] = useState<string[]>([]);
  const [filteredModels, setFilteredModels] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`
        );
        const data = await response.json();
        
        if (data.Results) {
          const modelList = [...new Set(data.Results.map((item: any) => item.Model_Name))].sort();
          setModels(modelList as string[]);
          setFilteredModels(modelList as string[]);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch vehicle models. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (year && make) {
      fetchModels();
    }
  }, [year, make, toast]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredModels(
        models.filter((model) =>
          model.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredModels(models);
    }
  }, [searchTerm, models]);

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
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
        {filteredModels.map((model) => (
          <Button
            key={model}
            variant={selectedModel === model ? "accent" : "outline"}
            onClick={() => onSelect(model)}
            className="h-14 text-base font-semibold justify-start px-4"
          >
            {model}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
