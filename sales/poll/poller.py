import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from sales_rest.models import AutoMobileVO, Customer, Salesperson


def get_automobiles():
    print("automobiles")
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    print("response", content)
    for automobile in content['autos']:
        newamvo = {
            "color": automobile["color"],
            "year": automobile["year"],
            "vin": automobile["vin"],
            "import_href": automobile["href"]
            #keys are model fields
            #values are from the response

        }
        AutoMobileVO.objects.update_or_create(
            **newamvo,
            defaults={
                "import_href": automobile["href"],
                "color": automobile["color"],
                "year": automobile["year"],
                "vin": automobile["vin"],
            }
        )
    
# def get_salesPerson():
#     response = requests.get("http://sales-api:8000/api/salesperson/")
#     content = json.loads(response.content)
#     for salesperson in content['salesp']:
#         Salesperson.objects.update_or_create(
#             import_href=salesperson['href'],
#             defaults={
#                 "name": salesperson["name"],
#                 "employee_number": salesperson["employee_number"],
#             }
#         )

def poll():
    while True:
        print('Sales poller polling for automobiles')
        try:
            get_automobiles()
            # get_salesPerson()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)




if __name__ == "__main__":
    poll()
