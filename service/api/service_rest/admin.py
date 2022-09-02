from django.contrib import admin
from .models import AutoMobileVO, ServiceAppointment, Technician

# Register your models here.

class AutoMobileVOAdmin(admin.ModelAdmin):
    pass

class ServiceAppointmentAdmin(admin.ModelAdmin):
    pass

class TechnicianAdmin(admin.ModelAdmin):
    pass


admin.site.register(AutoMobileVO, AutoMobileVOAdmin)
admin.site.register(ServiceAppointment, ServiceAppointmentAdmin)
admin.site.register(Technician, TechnicianAdmin)