import ResultsTable from "./ResultsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Business {
  id: string;
  name: string;
  address: string;
  phone: string;
  website?: string;
}

interface ResultsTabsProps {
  noWebResults: Business[];
  notOptimizedResults: Business[];
}

export default function ResultsTabs({
  noWebResults,
  notOptimizedResults,
}: ResultsTabsProps) {
  return (
    <Tabs
      defaultValue="noWeb"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="noWeb">Sin web</TabsTrigger>
        <TabsTrigger value="notOptimized">Sin optimizar</TabsTrigger>
      </TabsList>
      <TabsContent value="noWeb">
        <ResultsTable results={noWebResults} />
      </TabsContent>
      <TabsContent value="notOptimized">
        <ResultsTable results={notOptimizedResults} showWebsite={true} />
      </TabsContent>
    </Tabs>
  );
}
