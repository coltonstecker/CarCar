from unicodedata import name
from django.urls import path
from .views import api_list_technician, api_list_appointments, api_show_appointment, set_appointment_status, api_list_all_appointments


urlpatterns = [
    path("technicians/", api_list_technician, name="api_technicians"),
    path("appointments/", api_list_appointments, name="api_appointments"),
    path("appointments/<int:pk>/", api_show_appointment, name="api_appointment"),
    path("appointments/status/<int:pk>/", set_appointment_status, name="appointment_status"),
    path("appointments/all/", api_list_all_appointments, name="show_all")
]
