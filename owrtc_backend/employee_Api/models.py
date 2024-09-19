from django.db import models

class Employees(models.Model):
    employee_name = models.CharField(max_length = 100, blank=True)
    employee_password = models.CharField(max_length = 50, blank=True)
    employee_role = models.CharField(max_length = 50, blank=True)
    employee_email = models.EmailField(max_length = 100, blank=True)
    employee_contact = models.CharField(max_length = 10, blank=True)
    employee_rating = models.FloatField(default = 0, blank=True)
    active = models.BooleanField(default = 1, null=True)
    registered_by_hr = models.CharField(max_length = 20, blank=True)
    employee_registered_on = models.DateField(auto_now_add=True)
    wip = models.IntegerField(default = 0, blank=True)

    def __str__(self):
        return self.employee_name
    
    class Meta:
        db_table = 'employees'

