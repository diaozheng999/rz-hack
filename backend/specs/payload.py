#Account ID is BA
#toSavingsAccount is also BA
#Amount needs to be parameterized

#BA List
# "id": "CSYW471",
# "id": "ATPB226",
# "id": "HIPD598",


import requests

url = "https://razerhackathon.sandbox.mambu.com/api/savings/{{accountId}}/transactions"

payload = "{\n\t\"type\": \"TRANSFER\",\n    \"amount\": \"100\",\n    \"notes\": \"Transfer to Expenses Account\",\n    \"toSavingsAccount\": {{additionalSavingsAccount}},\n    \"method\":\"bank\"\n}"
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic VGVhbTg3OnBhc3MyRkEzMzY0Mjk=',
  'Content-Type': 'application/json',
  'Cookie': 'AWSALB=FacSX6ozn2Q38ZT6NZQhNEK9j5MlZOt7pGLUapLoevhbwREEo+Jtj1jDjvkfLZGsVLIXPmeewVWRy53zAbF8itWbXPXF/mr707PhcIYczC1NyQA1mDDPoacCpStJ; AWSALBCORS=FacSX6ozn2Q38ZT6NZQhNEK9j5MlZOt7pGLUapLoevhbwREEo+Jtj1jDjvkfLZGsVLIXPmeewVWRy53zAbF8itWbXPXF/mr707PhcIYczC1NyQA1mDDPoacCpStJ'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text.encode('utf8'))
