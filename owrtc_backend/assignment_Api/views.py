# from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Assignments
from .serializer import AssignmentSerializer
import time


# API getAssignments - API to GET all assignment data / id based assignment data
@api_view(['GET'])
def getAssignments(request, assignment_id=None):
    try:        
        if assignment_id:
            try:
                query = Assignments.objects.get(id = assignment_id)
                serializedData = AssignmentSerializer(query).data
                return Response(serializedData, status=status.HTTP_200_OK)

            except Exception as e:
                exception_message = f"Assignment with id {assignment_id} does not exist."
                return Response({exception_message}, status=status.HTTP_404_NOT_FOUND)
            
        else: 
            query = Assignments.objects.all()
            serializedData = AssignmentSerializer(query, many=True).data
            
            if serializedData:
                return Response(serializedData, status=status.HTTP_200_OK)
            
            else:
                exception_message = 'Assignment data empty, no records found in db.'
                return Response({exception_message}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        exception_message = f'Server side issue !! - {str(e)}'
        return Response({exception_message}, status=status.HTTP_400_BAD_REQUEST)
    


# API assignAssignment - API to POST / ADD the Assignment form data
@api_view(['POST']) 
def assignAssignment(request):
    try:
        time.sleep(2)
        form_data = request.data
        serializedData = AssignmentSerializer(data=form_data) 
        
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)
   
    except Exception as e:
        exception_message = f'Server side isssue !! - {str(e)}'
        return Response({exception_message}, status=status.HTTP_400_BAD_REQUEST)
    
    

# API updateAssignment - API to PUT / UPDATE the Assignment form data
@api_view(['GET', 'PUT'])
def updateAssignment(request, assignment_id=None):
    try:
        try:
            query_fetchId = Assignments.objects.get(id = assignment_id)
            
        except:
            return Response({'Assignment id not found in db'}, status=status.HTTP_404_NOT_FOUND)
                    
        if query_fetchId:
            time.sleep(1)
            form_data = request.data
            serializedData = AssignmentSerializer(query_fetchId, data=form_data)
            
            if serializedData.is_valid():
                serializedData.save()
                return Response(serializedData.data, status=status.HTTP_201_CREATED)
            
            else:
                return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)
                
    except Exception as e:
        exception_message = f'Server side issue !! - {str(e)}'
        return Response({exception_message}, status=status.HTTP_400_BAD_REQUEST)