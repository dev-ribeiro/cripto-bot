import ReactPaginate from "react-paginate";
import { useHome } from "../hooks/useHome";
import { usePaginator } from "../hooks/usePaginator";

export function Home() {
  const {
    symbols,
    isLoading
  } = useHome();

  const {
    currentItems,
    pageCount,
    updateOffset
  } = usePaginator({ data: symbols });

  if (isLoading) return <span>Carregando...</span>;

  if (!symbols) return <span>Não foi possível recuperar as criptomoedas</span>

  return (
    <main className="flex-1 flex flex-col justify-between font-montserrat">
      <div className="grid grid-cols-2 gap-4">
        {currentItems.map(item => (
          <div key={item.symbol} className="min-h-14 flex items-center justify-center">
            <h3>{item.symbol}</h3>
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={updateOffset}
        pageCount={pageCount}
        className="my-8 flex justify-center gap-5"
        activeClassName={'active '}
      />
    </main>
  );
}
