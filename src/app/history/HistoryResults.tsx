"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search as RecentSearch } from "@/db/schema";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HistoryResultsProps {
  results: RecentSearch[];
}

export default function HistoryResults({ results }: HistoryResultsProps) {
  const [filteredSearches, setFilteredSearches] =
    useState<RecentSearch[]>(results);
  const [filterQuery, setFilterQuery] = useState("");

  const handleFilter = () => {
    const filtered = results.filter(
      (search) =>
        search.business.toLowerCase().includes(filterQuery.toLowerCase()) ||
        search.location.toLowerCase().includes(filterQuery.toLowerCase())
    );
    setFilteredSearches(filtered);
  };

  const clearFilter = () => {
    setFilterQuery("");
    setFilteredSearches(results);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 ">
        <Input
          type="text"
          placeholder="Filtrar búsquedas..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="flex-grow"
        />
        <div className="flex space-x-2">
          <Button onClick={handleFilter} className="flex-grow sm:flex-grow-0">
            Filtrar
          </Button>
          <Button
            variant="outline"
            onClick={clearFilter}
            className="flex-grow sm:flex-grow-0"
          >
            Limpiar
          </Button>
        </div>
      </div>
      <RecentSearchesList searches={filteredSearches} />
    </div>
  );
}

interface RecentSearchesListProps {
  searches: RecentSearch[];
}

function RecentSearchesList({ searches }: RecentSearchesListProps) {
  return searches.length !== 0 ? (
    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {searches.map((search) => (
        <RecentSearchCard key={search.id} search={search} />
      ))}
    </div>
  ) : (
    <div className="mt-16 text-center space-y-2">
      <h3 className="text-xl text-gray-500 font-bold">
        No hay búsquedas recientes
      </h3>
      <p className="text-sm text-gray-500">
        Empieza a buscar y verás aquí las búsquedas más recientes
      </p>
    </div>
  );
}

interface RecentSearchCardProps {
  search: RecentSearch;
}

function RecentSearchCard({ search }: RecentSearchCardProps) {
  return (
    <Link
      href={"/search/[slug]"}
      as={`/search/${search.slug}`}
      className="block transition-transform hover:scale-105"
    >
      <Card>
        <CardContent className="flex items-start p-4">
          <div className="mr-4 mt-1">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-900">
              {search.business}
            </h3>
            <p className="text-sm text-gray-600">{search.location}</p>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>{search.createdAt?.toDateString()}</span>
              <span>{search.resultsCount} resultados</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
