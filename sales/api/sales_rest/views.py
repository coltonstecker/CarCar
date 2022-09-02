from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    SalespersonEncoder,
    CustomerEncoder,
    SaleRecordEncoder,
    AutoMobileVOEncoder,
)

from .models import AutoMobileVO, Customer, Salesperson, SaleRecord

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_salesperson(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalespersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson =Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesperson"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer =Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Exception as e:
            print(e)

@require_http_methods(["GET", "POST"])
def api_salesrecord(request):
    if request.method == "GET":
        salesrecords = SaleRecord.objects.all()
        return JsonResponse(
            {"salesrecords": salesrecords},
            encoder=SaleRecordEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            print("content", content)
            automobile = AutoMobileVO.objects.get(id=content["automobile"])
            salesindividual = Salesperson.objects.get(employee_number=content["salesperson"])
            customer = Customer.objects.get(phone_number=content["customer"])
            sale = {
                "automobile": automobile,
                "salesperson": salesindividual,
                "customer":customer,
                "sale_price": content["sale_price"]
            }
            print("sale", sale)
            salesrecord =SaleRecord.objects.create(**sale)
            return JsonResponse(
                salesrecord,
                encoder=SaleRecordEncoder,
                safe=False,
            )
        except AutoMobileVO.DoesNotExist:
            response = JsonResponse(
                {"message": "automobile does not exist"}
            )
            response.status_code = 400
            return response

        except Salesperson.DoesNotExist:
            response = JsonResponse(
                {"message": "salesperson does not exist"}
            )
            response.status_code = 400
            return response

        except Customer.DoesNotExist:
            response = JsonResponse(
                {"message": "customer does not exist"}
            )
            response.status_code = 400
            return response

        except Exception as e:
            print("exception this", e)
            response = JsonResponse(
                {"message": "Could not create the Sale Record"}
            )
            response.status_code = 400
            return response