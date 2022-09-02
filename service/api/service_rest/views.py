from asyncio import SafeChildWatcher
from pyexpat import model
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import ServiceAppointment, AutoMobileVO, Technician
from common.json import ModelEncoder
import json
# Create your views here.

class AutoMobileVOEncoder(ModelEncoder):
    model = AutoMobileVO
    properties = ["vin"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number", "id"]


class AppointmentListEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = ["customer_name", "reason", "date", "id", "status", "automobile", "time", "assigned_technician"]
    encoders = {
        "assigned_technician": TechnicianListEncoder(),
        "automobile": AutoMobileVOEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )



@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.filter(status=False)
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        print(content)

        try:
            technician = Technician.objects.get(employee_number=content["technician_number"])
            automobile = AutoMobileVO.objects.get(vin=content["vin"])
            # content["assigned_technician"] = technician
            service_Dictionary = {
                "customer_name": content["customer_name"],
                "reason": content["reason"],
                "date": content["date"],
                "time": content["time"],
                "automobile": automobile,
                "assigned_technician": technician
            }
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician not available"},
                status=400,
            )
        appointment = ServiceAppointment.objects.create(**service_Dictionary)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False
        )

@require_http_methods(["PUT"])
def set_appointment_status(request, pk):
    if request.method == "PUT":
        # appointment["status"] = True
        # appointment.save()
        appointment = ServiceAppointment.objects.filter(id=pk).update(status=True)
        appointment = ServiceAppointment.objects.get(id=pk)
        print(appointment)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )



@require_http_methods(["GET", "DELETE"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        appointment = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentListEncoder,
            safe=False,
        )
    else:
        try:
            appointment = ServiceAppointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse({"message": "This appointment does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_all_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False
        )