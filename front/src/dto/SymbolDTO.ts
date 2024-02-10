type Filter = {
  filterType: string;
  maxPrice?: string;
  minPrice?: string;
  tickSize?: string;
  maxQty?: string;
  minQty?: string;
  stepSize?: string;
  limit?: number;
  maxTrailingAboveDelta?: number;
  maxTrailingBelowDelta?: number;
  minTrailingAboveDelta?: number;
  minTrailingBelowDelta?: number;
  askMultiplierDown?: string;
  askMultiplierUp?: string;
  avgPriceMins?: number;
  bidMultiplierDown?: string;
  bidMultiplierUp?: string;
  applyMaxToMarket?: boolean;
  applyMinToMarket?: boolean;
  maxNotional?: string;
  minNotional?: string;
  maxNumOrders?: number;
  maxNumAlgoOrders?: number;
}

export class SymbolDTO {
  allowTrailingStop: boolean;
  allowedSelfTradePreventionModes: string[];
  baseAsset: string;
  baseAssetPrecision: number;
  baseCommissionPrecision: number;
  cancelReplaceAllowed: boolean;
  defaultSelfTradePreventionMode: string;
  filters: Filter[];
  icebergAllowed: boolean;
  isMarginTradingAllowed: boolean;
  isSpotTradingAllowed: boolean;
  ocoAllowed: boolean;
  orderTypes: string[];
  permissions: string[];
  quoteAsset: string;
  quoteAssetPrecision: number;
  quoteCommissionPrecision: number;
  quoteOrderQtyMarketAllowed: boolean;
  quotePrecision: number;
  status: string;
  symbol: string;
}
