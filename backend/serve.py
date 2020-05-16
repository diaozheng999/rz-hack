from flask import Flask
from flask_restplus import Resource, Api, fields
import requests, re, json, logging
from creds import creds

app = Flask(__name__)
api = Api(app, version='1.0', title='Q*bert', description='Manage your bank accounts!')
logging.basicConfig(level=logging.INFO)

post_url = "https://razerhackathon.sandbox.mambu.com/api/savings/{}/transactions"
get_url = "https://{}@razerhackathon.sandbox.mambu.com/api/clients/079660108/savings/{{}}".format(creds['teamlogin'])

post_headers = {
  'Content-Type': 'application/json',
  'Authorization': creds['mambuAuth'],
  'Content-Type': 'application/json',
  'Cookie': creds['mambuCookie']
}

post_payload = {'type': 'TRANSFER',
    'amount': '',
    'notes': 'Transfer to Expenses Account',
    'toSavingsAccount': '',
    'method':'bank'
}

transferReq = api.model('transferReq', {
    'amount': fields.String(required=True, description='The amount to transfer'),
    'fromAccount': fields.String(required=True, description='the account to transfer from'),
    'toAccount': fields.String(required=True, description='the account to transfer to')
})

acctDetails = api.model('acctDetails', {
    'id': fields.String(required=True, description='account id'),
    'name': fields.String(required=True, description='account name'),
    'balance': fields.String(required=True, description='account balance') 
})

acctList = api.model('acctList', {
    'accounts': fields.List(fields.Nested(acctDetails)),
})

# assume input is a string like abcd.ef 
# we will convert it to abcdef00
def toJSformat(someStr):
    fm0 = re.compile('[0-9]+\.[0-9]$')
    fm1 = re.compile('[0-9]+\.[0-9]{2,2}$')
    fm2 = re.compile('[0-9]+$')

    if fm0.match(someStr) is not None:
        return someStr.replace('.', '') + '000'
    elif fm1.match(someStr) is not None:
        return someStr.replace('.', '') + '00'
    elif fm2.match(someStr) is not None:
        return someStr + '0000'
    else:
        raise Exception("Unexpected balance number {} was passed".format(someStr))

# assume input is a string like abcdefg
# we will convert it to abc.defg
def fromJSformat(someStr):
    fm3 = re.compile('[0-9]{4,}$')
    if fm3.match(someStr) is not None:
        return someStr[:-4] + '.' + someStr[-4:-2]
    else:
        raise Exception("Unexpected balance number {} was passed".format(someStr))

class Qbert(object):
    def __init__(self):
        self.accounts = ['CSYW471', 'ATPB226', 'HIPD598']

    def get_balance(self, acct_id):
        if acct_id not in self.accounts:
            raise Exception('Invalid account')

        r = requests.request("GET", get_url.format(acct_id)) 
        if r.status_code not in [200, 201]:
            app.logger.error("Error: {}".format(r.text))
            raise Exception('Get request failed')

        results = r.json()
        return toJSformat(results['availableBalance'])

    def get_acct_details(self, acct_id):
        if acct_id not in self.accounts:
            raise Exception('Invalid account')

        r = requests.request("GET", get_url.format(acct_id)) 
        app.logger.debug(r.text)
        if r.status_code not in [200, 201]:
            app.logger.error("Error: {}".format(r.text))
            raise Exception('Get request failed')
            
        results = r.json()
        details = { "id": results['id'], 
                "name": results['name'], 
                "balance": toJSformat(results['availableBalance'])}
        return details

    def get_accts(self):
        all_details = []
        for acct_id in self.accounts:
            all_details.append(self.get_acct_details(acct_id))

        app.logger.debug("----all details: \n{}".format(all_details))
        return all_details

    def transfer(self, data):
        amount = int(data['amount'])
        fromAcct = data['fromAccount']
        toAcct = data['toAccount']

        if amount < 0:
            raise Exception('Requested transfer amount must be positive')
        if fromAcct == toAcct:
            raise Exception('Cannot transfer to same account')

        def _transfer(amt, frAcct, toAcct):
            app.logger.info("Attempt to transfer {} from {} to {}".format(amt, frAcct, toAcct))
            post_payload['amount'] = fromJSformat(str(amt))
            post_payload['toSavingsAccount'] = toAcct
            app.logger.debug(json.dumps(post_payload))
            r = requests.request("POST", post_url.format(frAcct), headers=post_headers, data=json.dumps(post_payload))
            app.logger.debug("status code: {}".format(r.status_code))
            if r.status_code not in [200, 201]:
                app.logger.error("Error: {}".format(r.text))
                raise Exception('Transfer request failed')

        _transfer(amount, fromAcct, toAcct)

qbert = Qbert()

@api.route('/account/<string:acct_id>')
class Account(Resource):
    @api.marshal_with(acctDetails)
    @api.doc(responses={400: 'Error', 200: 'Ok'})
    def get(self, acct_id):
        try:
            return qbert.get_acct_details(acct_id), 200
        except Exception as e:
            return {'errorMsg': str(e)}, 400

@api.route('/accounts')
class Accounts(Resource):
    @api.marshal_with(acctList)
    @api.doc(responses={400: 'Error', 200: 'Ok'})
    def get(self):
        try:
            return {"accounts": qbert.get_accts()}, 200
        except Exception as e:
            return {'errorMsg': str(e)}, 400

@api.route('/transfer')
class Transfer(Resource):
    @api.expect(transferReq)
    @api.doc(responses={400: 'Error', 200: 'Ok'})
    def post(self):
        data = api.payload
        app.logger.debug(data)
        try:
            qbert.transfer(data)
            return {"status": "OK"}, 200
        except Exception as e:
            return {'errorMsg': str(e)}, 400

if __name__ == '__main__':
    #debug=True,
    app.run(host='172.31.31.188', debug=True, port=12012)
