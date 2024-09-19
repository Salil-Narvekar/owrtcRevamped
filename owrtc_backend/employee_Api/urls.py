from django.urls import path
from .views import getEmployees, registerEmployee, updateEmployee

urlpatterns = [
    path('getEmployees/', getEmployees, name='getEmployees'),
    path('getEmployees/<int:employee_id>/', getEmployees, name='getEmployees'),
    path('registerEmployee/', registerEmployee, name='registerEmployee'),
    path('updateEmployee/<int:employee_id>', updateEmployee, name='updateEmployee'),
]