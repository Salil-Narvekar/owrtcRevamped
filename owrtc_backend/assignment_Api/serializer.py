from rest_framework import serializers
from assignment_Api.models import Assignments
        
class AssignmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Assignments
        fields = '__all__'