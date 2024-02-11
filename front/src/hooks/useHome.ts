import { useState } from "react";
import { BinanceService } from "../services/BinanceService"
import { useQuery } from "@tanstack/react-query";
import { SymbolDTO } from "../dto/SymbolDTO";

export function useHome() {
  const binanceService = new BinanceService();
  const [activeSymbol, setActiveSymbol] = useState<SymbolDTO | null>(null);

  const { data: symbols, isLoading } = useQuery({
    queryKey: ['exchange_info'],
    queryFn: () => binanceService.findAllExchangeInfo()
  })

  const {
    data: tickerData,
    isLoading: isLoadingTickerData,
  } = useQuery({
    queryKey: ['ticker_24h', activeSymbol],
    queryFn: () => binanceService.findQuoteData(activeSymbol!.symbol),
    enabled: activeSymbol !== null,
    refetchInterval: 5 * 1000
  })

  const updateActiveSymbol = (value: SymbolDTO | null) => {
    setActiveSymbol(value);
  }

  return {
    symbols,
    isLoading,
    activeSymbol,
    tickerData,
    isLoadingTickerData,
    updateActiveSymbol
  }
}
