from django.db import models

class Assignments(models.Model):
    assignment_title = models.CharField(max_length=50, blank=True)
    assignment_type = models.CharField(max_length=20, blank=True)
    assignment_status = models.CharField(max_length=20, blank=True)
    creation_date = models.CharField(max_length=20, blank=True)
    starting_date = models.CharField(max_length=20, blank=True)
    deadline_date = models.CharField(max_length=20, blank=True)
    assignment_team = models.JSONField(blank=True) 
    assignment_project_manager = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return self.assignment_title
    
    class Meta:
        db_table = 'assignments'
    
