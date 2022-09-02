from django.contrib import admin
from .models import AutoMobileVO, Salesperson, Customer, SaleRecord

# Register your models here.
class AutoMobileVOAdmin(admin.ModelAdmin):
    pass
class SalespersonAdmin(admin.ModelAdmin):
    pass
class CustomerAdmin(admin.ModelAdmin):
    pass
class SaleRecordAdmin(admin.ModelAdmin):
    pass

admin.site.register(AutoMobileVO, AutoMobileVOAdmin)
admin.site.register(Salesperson, SalespersonAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(SaleRecord, SaleRecordAdmin)