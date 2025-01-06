import ResultsTabs from "../ResultsTabs";
import SearchBar from "../SearchBar";
import { getSearchBySlug } from "@/app/data-access/searches";
import { getBusinessesBySearchId } from "@/app/data-access/businesses";
import { LoaderCircle } from "lucide-react";
import Poller from "./Poller";

export default async function Search({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const search = await getSearchBySlug(slug);

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

  return (
    <>
      <Poller search={search} />
      <h1 className="text-3xl font-bold text-foreground text-center mb-8">
        Buscar Oportunidades
      </h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar
          initialQuery={search.business}
          initialLocation={search.location}
        />
        {businesses.length !== 0 ? (
          <ResultsTabs businesses={businesses} />
        ) : (
          <div className="flex flex-col justify-center items-center p-16 space-y-2">
            <LoaderCircle className="animate-spin text-primary size-14" />
            <p>Procesando...</p>
          </div>
        )}
      </div>
    </>
  );
}
