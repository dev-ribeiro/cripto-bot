import ReactPaginate from "react-paginate";
import { useHome } from "../hooks/useHome";
import { usePaginator } from "../hooks/usePaginator";
import { SymbolDTO } from "../dto/SymbolDTO";
import * as Dialog from '@radix-ui/react-dialog';
import { BounceLoader } from "react-spinners";

export function Home() {
  const {
    symbols,
    isLoading,
    activeSymbol,
    tickerData,
    isLoadingTickerData,
    updateActiveSymbol
  } = useHome();

  const {
    currentItems,
    pageCount,
    updateOffset
  } = usePaginator<SymbolDTO>({ data: symbols });

  if (isLoading) return <span>Carregando...</span>;

  if (!symbols) return <span>Não foi possível recuperar as criptomoedas</span>

  return (
    <Dialog.Root>
      <main className="flex-1 flex flex-col justify-between md:justify-start font-montserrat">
        <div className="py-2 md:py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentItems.map(item => (
            <div key={item.symbol} className="min-h-14 flex flex-col items-center justify-center gap-2">
              <h3>{item.symbol}</h3>
              <span className="text-xl">{Number(item.price).toFixed(3)}</span>
              <Dialog.Trigger>
                <button onClick={() => updateActiveSymbol(item)} className="p-1 bg-green-500 rounded">
                  <span className="text-xs text-gray-100">MONITORAR</span>
                </button>
              </Dialog.Trigger>
            </div>
          ))}
        </div>
        <ReactPaginate
          breakLabel="..."
          previousLabel="<"
          nextLabel=">"
          onPageChange={updateOffset}
          pageCount={pageCount}
          className="my-8 flex justify-center gap-3"
          activeClassName={'active '}
          pageRangeDisplayed={1}
        />
      </main>

      <Dialog.Portal>
        <Dialog.Content>
          <div className='absolute top-0 left-0 min-h-screen w-full flex justify-center items-center bg-black bg-opacity-55'>
            <div className="p-3 max-w-[90vw] md:min-w-[50vw] md:max-w-[90vw] flex flex-col rounded bg-gray-200">
              <div className="flex justify-end">
                <Dialog.Close onClick={() => updateActiveSymbol(null)}>
                  <div className="text-red-700">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                  </div>
                </Dialog.Close>
              </div>
              {isLoadingTickerData && <span>Carregando...</span>}
              {(!isLoadingTickerData && !tickerData) && <span>Não foi possível recuperar as informações do ativo</span>}
              {(!isLoadingTickerData && tickerData) && (
                <div className="flex flex-col gap-3">
                  <Dialog.Title>
                    <h3 className="text-center text-2xl">{activeSymbol?.symbol}</h3>
                  </Dialog.Title>
                  <Dialog.Description>
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-[2] flex flex-col gap-1">
                        <span>Preço atual:</span>
                        <span className="text-xl">{Number(tickerData.lastPrice).toFixed(4)}</span>
                      </div>
                      <div className="flex-[1] flex flex-col gap-1">
                        <span>Maior preço:</span>
                        <span className="text-xl">{Number(tickerData.highPrice).toFixed(4)}</span>
                      </div>
                      <div className="flex-[1] flex flex-col gap-1">
                        <span>Menor preço:</span>
                        <span className="text-xl">{Number(tickerData.lowPrice).toFixed(4)}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <BounceLoader color="#16a34a" size={18} />
                      <span>Última atualização em: {new Date(Number(tickerData.closeTime)).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit', second: 'numeric' })}</span>
                    </div>
                  </Dialog.Description>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
