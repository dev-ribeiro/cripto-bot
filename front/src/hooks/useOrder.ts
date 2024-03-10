import { useQuery } from "@tanstack/react-query"
import { BinanceService } from "../services/BinanceService"
import { Order } from "../models"

export function useOrder() {
  const {
    findAllOrders,
    createOrder
  } = new BinanceService()

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError
  } = useQuery({
    queryKey: ['orders', new Date()],
    queryFn: () => findAllOrders(),
    initialData: [],
    staleTime: 15 * 1000
  })

  const submitDataToBinance = async (data: Order) => {
    try {
      createOrder(data)
    } catch (error) {
      console.error(error)
      alert('Houve um erro')
    }
  }

  return {
    orders,
    ordersLoading,
    ordersError,
    submitDataToBinance
  }
}
