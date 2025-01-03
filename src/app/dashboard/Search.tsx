"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ResultsTabs from "@/components/ResultsTabs";

interface Business {
  id: string;
  name: string;
  address: string;
  phone: string;
  website?: string;
}

export default function Search() {
  const [noWebResults, setNoWebResults] = useState<Business[]>([]);
  const [notOptimizedResults, setNotOptimizedResults] = useState<Business[]>(
    []
  );

  const handleSearch = async (query: string, location: string) => {
    console.log("Query", query);
    console.log("Location", location);

    // const res = await fetch(`/api/search?query=${query}+en+${location}`);
    // const data = await res.json();
    // console.log(data);

    const mockNoWebResults: Business[] = [
      {
        id: "1",
        name: "Veterinaria Pelusa",
        address: "Calle Principal 123, Málaga",
        phone: "123-456-789",
      },
      {
        id: "2",
        name: "Clínica Veterinaria Huellitas",
        address: "Avenida Central 456, Málaga",
        phone: "987-654-321",
      },
      {
        id: "3",
        name: "Hospital Veterinario 24h",
        address: "Plaza Mayor 789, Málaga",
        phone: "456-789-123",
      },
    ];

    const mockNotOptimizedResults: Business[] = [
      {
        id: "4",
        name: "Veterinaria El Bosque",
        address: "Calle del Pino 234, Málaga",
        phone: "111-222-333",
        website: "http://veterinariaelbosque.com",
      },
      {
        id: "5",
        name: "Centro Veterinario Málaga",
        address: "Avenida de la Luz 567, Málaga",
        phone: "444-555-666",
        website: "http://centroveterinariomalaga.es",
      },
      {
        id: "6",
        name: "Clínica de Mascotas Felices",
        address: "Paseo de los Tilos 890, Málaga",
        phone: "777-888-999",
        website: "http://mascotasfelices.com",
      },
    ];

    setNoWebResults(mockNoWebResults);
    setNotOptimizedResults(mockNotOptimizedResults);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SearchBar onSearch={handleSearch} />
      <ResultsTabs
        noWebResults={[
          ...noWebResults,
          ...noWebResults,
          ...noWebResults,
          ...noWebResults,
          ...noWebResults,
          ...noWebResults,
          ...noWebResults,
        ]}
        notOptimizedResults={notOptimizedResults}
      />
    </div>
  );
}
