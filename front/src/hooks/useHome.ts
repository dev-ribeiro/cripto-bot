import { BinanceService } from "../services/BinanceService"
import { useQuery } from "@tanstack/react-query";

export function useHome() {
  const binanceService = new BinanceService();

  const { data, isLoading } = useQuery({
    queryKey: ['exchange_info'],
    queryFn: () => binanceService.findAllExchangeInfo()
  })

  const symbols = data?.symbols

  return {
    symbols,
    isLoading
  }
}
