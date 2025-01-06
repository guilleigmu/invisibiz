import { getAllSearches } from "../data-access/searches";
import HistoryResults from "./HistoryResults";

export default async function History() {
  const searches = await getAllSearches();

  return (
    <>
      <h1 className="text-3xl font-bold text-foreground text-center mb-8">
        Búsquedas recientes
      </h1>
      <HistoryResults results={searches} />
    </>
  );
}
