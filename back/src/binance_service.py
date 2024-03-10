import logging
import requests
from enviroment import *
from binance.spot import Spot as Client
from binance.lib.utils import config_logging

config_logging(logging, logging.DEBUG)


class BinanceService:

    def __init__(self):
        self.client = Client(
            base_url='https://testnet.binance.vision',
            timeout=100,
            api_key=BINANCE_KEY,
            api_secret=BINANCE_SECRET
        )

    async def findAllExchangeInfo(self):
        try:
            query = self.client.ticker_price()

            return query

        except:
            raise Exception('Não foi possível recuperar todas as cotações')

    async def findQuotesFromLast24Hours(self, symbol):
        try:
            query = self.client.ticker_24hr(symbol=symbol)

            return query

        except:
            raise Exception('Não foi possível recuperar a cotação')

    async def createOrder(self, data):
        await self.createTestOrder(data)

        order = self.client.new_order(
            symbol=data['symbol'],
            side=data['side'],
            type=data['type'],
            quantity=data['quantity']
        )

        return order

    async def createTestOrder(self, data):
        try:
            order = await self.client.new_order_test(
                symbol=data['symbol'],
                side=data['side'],
                type=data['type'],
                quantity=data['quantity']
            )

            data = order

        except:
            raise 'Não foi possível criar a ordem'

    async def cancelOrder(self):
        pass

    def findAllOrders(self):
        query = self.client.get_order()

        return query

    def findAccount(self):
        query = self.client.account_snapshot("SPOT")

        return query
