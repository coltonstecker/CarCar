from django.urls import path

from .views import (
    api_salesperson,
    api_customer,
    api_salesrecord,
)

urlpatterns = [
    path(
        "salesperson/",
        api_salesperson,
        name="api_salesperson",
        ),
    
    path(
        "customer/",
        api_customer,
        name="api_customer",
        ),

    path("salesrecord/",
        api_salesrecord,
        name="api_salesrecord",
        )
]
