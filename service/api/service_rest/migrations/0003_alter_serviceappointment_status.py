# Generated by Django 4.0.3 on 2022-05-12 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_serviceappointment_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceappointment',
            name='status',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
