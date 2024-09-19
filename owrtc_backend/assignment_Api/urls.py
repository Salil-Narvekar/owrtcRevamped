from django.urls import path
from .views import getAssignments, assignAssignment, updateAssignment

urlpatterns = [
    path('getAssignments/', getAssignments, name="getAssignments"),
    path('getAssignments/<int:assignment_id>/', getAssignments, name="getAssignments"),
    path('assignAssignment/', assignAssignment, name="assignAssignment"),
    path('updateAssignment/<int:assignment_id>/', updateAssignment, name="updateAssignment"),
]
