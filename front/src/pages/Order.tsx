import { useForm } from "react-hook-form"
import { useOrder } from "../hooks/useOrder"
import { Order as OrderModel } from "../models"

export function Order() {
  const {
    orders,
    ordersLoading,
    ordersError,
    submitDataToBinance
  } = useOrder()

  const {
    register,
    handleSubmit
  } = useForm<OrderModel>()

  const submitOrderData = (data: OrderModel) => {
    submitDataToBinance({
      ...data,
      type: 'MARKET'
    })
  }

  const ordersComponentOnLoading = ordersLoading && (
    <div>
      Carregando ordens...
    </div>
  )

  const ordersComponentOnError = (ordersError && !ordersLoading) && (
    <div>
      Houve um erro ao buscar as ordens
    </div>
  )

  const orderComponentOnSuccess = (!ordersError && !ordersLoading) && (
    <div>
      {orders.length === 0 && (<span>Não há ordens</span>)}
      {orders.length > 0 && orders.map(order => (
        <div key={order.clientOrderId}>
          <span>{order.status}</span>
          <span>{order.symbol}</span>
        </div>
      ))}
    </div>
  )

  return (
    <main>
      <section className="my-4 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">
          Criar ordem
        </h2>
        <form className="flex items-center gap-4" onSubmit={handleSubmit(submitOrderData)}>
          <div className="flex items-center gap-2">
            <label htmlFor="symbol">
              Ativo
            </label>
            <input
              className="p-1 border-[1px] border-solid border-black rounded"
              type="text"
              {...register('symbol')}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="side">
              Lado
            </label>
            <select
              className="p-1 border-[1px] border-solid border-black rounded"
              {...register('side')}
            >
              <option value="BUY">Compra</option>
              <option value="SELL">Venda</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="quantity">
              Quantidade:
            </label>
            <input
              className="p-1 border-[1px] border-solid border-black rounded"
              type="number"
              {...register('quantity')}
            />
          </div>
          <button className="p-3 text-white bg-green-700 rounded">CRIAR</button>
        </form>
      </section>
      <section className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">MINHAS ORDENS</h2>
        {ordersComponentOnLoading}
        {ordersComponentOnError}
        {orderComponentOnSuccess}
      </section>
    </main>
  )
}
