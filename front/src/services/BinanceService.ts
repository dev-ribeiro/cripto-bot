import { AxiosResponse } from "axios";
import { api } from "../libs/api";
import { SymbolDTO } from "../dto/SymbolDTO";
import { MarketDataDTO } from "../dto/MarketDataDTO";

export class BinanceService {
  private http = api;

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

}
