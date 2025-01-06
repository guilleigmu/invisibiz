"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleSearch } from "./actions";

export default function SearchBar({
  initialQuery,
  initialLocation,
}: {
  initialQuery?: string;
  initialLocation?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [location, setLocation] = useState(initialLocation ?? "");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);

  return (
    <form action={handleSearch} className="max-w-3xl mx-auto mt-8 mb-8">
      <input type="hidden" name="userId" value={userId} />
      <div className="flex space-x-2">
        <Input
          name="query"
          type="text"
          placeholder="Buscar negocios (ej: veterinarios)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Input
          name="location"
          type="text"
          placeholder="Ubicación (ej: Gijón)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button type="submit" disabled={query === "" || location === ""}>
          Buscar
        </Button>
      </div>
    </form>
  );
}
