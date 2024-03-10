import { AxiosResponse } from "axios";
import { api } from "../libs/api";
import { SymbolDTO } from "../dto/SymbolDTO";
import { MarketDataDTO } from "../dto/MarketDataDTO";
import { Order } from "../models";

export class BinanceService {
  constructor(private http = api) {}

  async findAllExchangeInfo() {
    type Response = AxiosResponse<SymbolDTO[]>;

    const response: Response = await this.http.get('/quote');

    return response.data;
  }

  async findQuoteData(symbol: string) {
    type Response = AxiosResponse<MarketDataDTO>;

    const response: Response = await this.http.post('/quote', { symbol });

    return response.data;
  }

  async findAllOrders() {
    type Response = AxiosResponse<Order[]>;

    const response: Response = await this.http.get('/orders');

    return response.data;
  }

  async createOrder(order: Order) {
    const response = await api.post('/order', order)

    return response.data
  }

}
