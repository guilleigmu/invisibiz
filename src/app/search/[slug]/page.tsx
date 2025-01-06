import ResultsTabs from "@/components/ResultsTabs";
import SearchBar from "../SearchBar";
import { getSearchBySlug } from "@/app/data-access/searches";
import { getBusinessesBySearchId } from "@/app/data-access/businesses";

export default async function Search({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  console.log(slug);
  const search = await getSearchBySlug(slug);
  console.log(search);

  if (!search) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold text-foreground text-center mb-8">
          No se encontró la búsqueda
        </h1>
      </div>
    );
  }

  const businesses = await getBusinessesBySearchId(search.id);
  console.log(businesses);

  return (
    <>
      <h1 className="text-3xl font-bold text-foreground text-center mb-8">
        Buscar Oportunidades
      </h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar />
        <ResultsTabs noWebResults={[]} notOptimizedResults={[]} />
      </div>
    </>
  );
}
