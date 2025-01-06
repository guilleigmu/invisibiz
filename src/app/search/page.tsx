import SearchBar from "./SearchBar";

export default function SearchPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-foreground text-center mb-8">
        Buscar Oportunidades
      </h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </div>
    </>
  );
}
