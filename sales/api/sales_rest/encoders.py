from common.json import ModelEncoder

from .models import Salesperson, Customer, SaleRecord, AutoMobileVO


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "name",
        "employee_number",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]

class AutoMobileVOEncoder(ModelEncoder):
    model = AutoMobileVO
    properties = [
        "color",
        "year",
        "vin",
        "import_href",
    ]
class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "sale_price"
        ]
    encoders = {
        "automobile": AutoMobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }

