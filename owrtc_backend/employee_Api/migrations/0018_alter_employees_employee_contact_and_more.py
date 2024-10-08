# Generated by Django 5.0.7 on 2024-09-04 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee_Api', '0017_employees_wip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employees',
            name='employee_contact',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='employees',
            name='employee_email',
            field=models.EmailField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='employees',
            name='employee_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='employees',
            name='employee_password',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='employees',
            name='employee_rating',
            field=models.FloatField(blank=True, default=0.0),
        ),
        migrations.AlterField(
            model_name='employees',
            name='employee_role',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='employees',
            name='registered_by_hr',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='employees',
            name='wip',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
