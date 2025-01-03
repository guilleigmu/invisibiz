import Header from "@/components/Header";
import Search from "./Search";
import ScrapeButton from "./ScrapeButton";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground text-center mb-8">
            Buscar Oportunidades
          </h1>
          <Search />
          <ScrapeButton />
        </div>
      </main>
    </div>
  );
}
