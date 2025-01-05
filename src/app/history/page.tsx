import HistoryResults from "./HistoryResults";

export default function History() {
  return (
    <>
      <h1 className="text-3xl font-bold text-foreground text-center mb-8">
        Búsquedas recientes
      </h1>
      <HistoryResults />
    </>
  );
}
