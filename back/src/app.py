from flask import Flask, request, json
from flask_cors import CORS
from binance_service import BinanceService

app = Flask(__name__)

CORS(app)

binance_service = BinanceService()

@app.route('/quote',methods=['GET'])
async def findAllExchangeInfo():
   try:
      result = await binance_service.findAllExchangeInfo()

      data = json.dumps(result)

      response = app.response_class(status=200,response=data)

      return response
   except:
      response = app.response_class(status=400)

      return response

@app.route('/quote', methods=['POST'])
async def findQuotesFromLast24Hours():
    try:
      body = request.json

      result = await binance_service.findQuotesFromLast24Hours(body['symbol'])

      data = json.dumps(result)

      response = app.response_class(status=200,response=data)

      return response

    except:

       response = app.response_class(status=400)

       return response

@app.route('/orders', methods=['GET'])
def get_orders():
  try:
    result = binance_service.findAllOrders()

    data = json.dumps(result)

    print(data)

    response = app.response_class(status=200,response=data)

    return response

  except:
    response = app.response_class(status=400)

    return response

@app.route('/order', methods=['POST'])
async def createOrder():
  try:
    body = request.json

    result = await binance_service.createOrder(body)

    data = json.dumps(result)

    print(data)

    response = app.response_class(status=200,response=data)

    return response

  except:
    response = app.response_class(status=400)

    return response

@app.route('/account', methods=['GET'])
def findAccountApiTrandingStatus():
  try:
    result = binance_service.findAccount()

    data = json.dumps(result)

    response = app.response_class(status=200,response=data)

    return response
  except:
    response = app.response_class(status=400)

    return response

if(__name__ == '__main__'):
  app.run(debug=True)
