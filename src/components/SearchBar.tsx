import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-8 mb-8">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Buscar negocios (ej: veterinarios)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Input
          type="text"
          placeholder="Ubicación (ej: Málaga)"
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
