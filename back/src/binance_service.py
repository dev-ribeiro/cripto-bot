import requests
from enviroment import *
from binance.spot import Spot as Client


class BinanceService:

    def __init__(self):
        self.client = Client(base_url='https://testnet.binance.vision',timeout=100)

    async def findAllExchangeInfo(self):
        try:
            query = self.client.exchange_info()

            return query

        except:
            raise Exception('Não foi possível recuperar todas as cotações')

    async def findQuotesFromLast24Hours(self, symbol):
        try:
            query = self.client.exchange_info(symbol=symbol)

            return query

        except:
            raise Exception('Não foi possível recuperar a cotação')
