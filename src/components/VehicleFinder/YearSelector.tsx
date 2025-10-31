import { Button } from "@/components/ui/button";

interface YearSelectorProps {
  selectedYear: string;
  onSelect: (year: string) => void;
}

const YearSelector = ({ selectedYear, onSelect }: YearSelectorProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 + 1 }, (_, i) => (currentYear + 1 - i).toString());

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-96 overflow-y-auto p-1">
      {years.map((year) => (
        <Button
          key={year}
          variant={selectedYear === year ? "accent" : "outline"}
          onClick={() => onSelect(year)}
          className="h-14 text-lg font-semibold"
        >
          {year}
        </Button>
      ))}
    </div>
  );
};

export default YearSelector;
