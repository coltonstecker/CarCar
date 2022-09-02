from tkinter import CASCADE
from django.db import models
from django.urls import reverse

# Create your models here.

class AutoMobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField(unique=True)
    
    def get_api_url(self):
        return reverse("api_technicians", kwargs={"pk": self.id})


class ServiceAppointment(models.Model):
    customer_name = models.CharField(max_length=100)
    reason = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    status = models.BooleanField(null=True, blank=True, default=False)
    assigned_technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE
    )
    automobile = models.ForeignKey(
        AutoMobileVO,
        related_name="appointments",
        on_delete=models.CASCADE
    )

    
    def set_completed(self):
        self.status = True



# set default status to true
# true means that the appointment is pending completion or cancelation
# when either button is pressed, status will be updated to false
# false will remove the appointment from the list, but keep it in service history
    
