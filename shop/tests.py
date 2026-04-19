from django.test import TestCase

# Create your tests here.
import requests

url = "http://127.0.0.1:8000/api/products/"
url1 = "http://127.0.0.1:8000/api/user/"
response = requests.get(url)

if response.status_code == 200:
    products = response.json()
    for p in products:
        print(f"{p['name']} - {p['price']} - stock: {p['stock']}")
else:
    print("Error:", response.status_code)

response = requests.get(url1)

if response.status_code == 200:
    user = response.json()
    for u in user:
        print(f"{u['user_id']} - {u['user_name']} - {u['email']}")
else:
    print("Error:", response.status_code)