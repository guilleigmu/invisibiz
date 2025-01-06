import { Business } from "@/db/schema";
import ResultsTable from "./ResultsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsTabsProps {
  businesses: Business[];
}

export default function ResultsTabs({ businesses }: ResultsTabsProps) {
  const noWebResults = businesses.filter((business) => !business.website);
  const notOptimizedResults = businesses.filter((business) => business.website);

  return (
    <Tabs defaultValue="noWeb" className="flex flex-col">
      <TabsList className="grid grid-cols-2 mr-auto">
        <TabsTrigger value="noWeb">Sin web</TabsTrigger>
        <TabsTrigger value="notOptimized">Con web</TabsTrigger>
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
