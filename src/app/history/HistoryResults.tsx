"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RecentSearch {
  id: string;
  query: string;
  location: string;
  date: string;
  resultsCount: number;
}

export default function HistoryResults() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);
  const [filteredSearches, setFilteredSearches] = useState<RecentSearch[]>([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    // Simular la carga de búsquedas recientes
    const mockSearches: RecentSearch[] = [
      {
        id: "1",
        query: "veterinarios",
        location: "Málaga",
        date: "2023-06-01",
        resultsCount: 15,
      },
      {
        id: "2",
        query: "peluquerías",
        location: "Sevilla",
        date: "2023-05-30",
        resultsCount: 22,
      },
      {
        id: "3",
        query: "restaurantes",
        location: "Granada",
        date: "2023-05-29",
        resultsCount: 45,
      },
      {
        id: "4",
        query: "gimnasios",
        location: "Córdoba",
        date: "2023-05-28",
        resultsCount: 10,
      },
      {
        id: "5",
        query: "dentistas",
        location: "Málaga",
        date: "2023-05-27",
        resultsCount: 18,
      },
      {
        id: "6",
        query: "talleres mecánicos",
        location: "Valencia",
        date: "2023-05-26",
        resultsCount: 30,
      },
    ];
    setSearches(mockSearches);
    setFilteredSearches(mockSearches);
  }, []);

  const handleFilter = () => {
    const filtered = searches.filter(
      (search) =>
        search.query.toLowerCase().includes(filterQuery.toLowerCase()) ||
        search.location.toLowerCase().includes(filterQuery.toLowerCase())
    );
    setFilteredSearches(filtered);
  };

  const clearFilter = () => {
    setFilterQuery("");
    setFilteredSearches(searches);
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

interface RecentSearch {
  id: string;
  query: string;
  location: string;
  date: string;
  resultsCount: number;
}

interface RecentSearchesListProps {
  searches: RecentSearch[];
}

function RecentSearchesList({ searches }: RecentSearchesListProps) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {searches.map((search) => (
        <RecentSearchCard key={search.id} search={search} />
      ))}
    </div>
  );
}

interface RecentSearch {
  id: string;
  query: string;
  location: string;
  date: string;
  resultsCount: number;
}

interface RecentSearchCardProps {
  search: RecentSearch;
}

function RecentSearchCard({ search }: RecentSearchCardProps) {
  return (
    <Link href="" className="block transition-transform hover:scale-105">
      <Card>
        <CardContent className="flex items-start p-4">
          <div className="mr-4 mt-1">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-900">
              {search.query}
            </h3>
            <p className="text-sm text-gray-600">{search.location}</p>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>{search.date}</span>
              <span>{search.resultsCount} resultados</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
