from django.db import models
from django.urls import reverse

# Create your models here.
class Salesperson(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.IntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_salesPerson", kwargs={"pk": self.id})

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.BigIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_salesPerson", kwargs={"pk": self.id})

class AutoMobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)

class SaleRecord(models.Model):
    automobile = models.ForeignKey(
        AutoMobileVO,
        related_name="sales",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )
    sale_price = models.IntegerField()