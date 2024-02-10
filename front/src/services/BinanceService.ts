import { AxiosResponse } from "axios";
import { api } from "../libs/api";
import { SymbolDTO } from "../dto/SymbolDTO";

export class BinanceService {
  private http = api;

  async findAllExchangeInfo() {
    type Response = AxiosResponse<{
      symbols: SymbolDTO[]
    }>

    const response: Response = await this.http.get('/quote');

    return response.data;
  }

}
