# from django.shortcuts import request
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Employees
from .serializer import EmployeeSerializer
import time


# API getEmployees - API to GET all employees data / id based employee data
@api_view(['GET'])
def getEmployees(request, employee_id=None):    
    try:    
        if employee_id:
            try:
                query = Employees.objects.get(id=employee_id)
                serializedData = EmployeeSerializer(query).data
                return Response(serializedData, status = status.HTTP_200_OK)
                
            except:
                exception_message = f"Employee with id {employee_id} does not exist."
                return Response({exception_message}, status = status.HTTP_404_NOT_FOUND)

        else:
            query = Employees.objects.all()
            serializedData = EmployeeSerializer(query, many=True).data

            if serializedData:
                return Response(serializedData, status = status.HTTP_200_OK)
            
            else:
                exception_message = 'Employee data empty, no records found in db'
                return Response(serializedData, status = status.HTTP_404_NOT_FOUND)
        
    except Exception as e:
        exception_message = f'Server side isssue !! / {str(e)}'
        return Response({exception_message}, status=status.HTTP_400_BAD_REQUEST) 



# API registerEmployee - API to POST / ADD the Employee Form data ...................................................................
@api_view(['POST'])
def registerEmployee(request):
    try:
        time.sleep(2)
        form_data = request.data
        serializedData = EmployeeSerializer(data=form_data)
        
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        exception_message = f'Server side isssue !! - {str(e)}'
        return Response({exception_message}, status=status.HTTP_400_BAD_REQUEST)
    
    
    
# API updateEmployee - API to PUT / UPDATE the Employee Form data ...................................................................
@api_view(['PUT', 'GET'])
def updateEmployee(request, employee_id=None):
    try:
        try:                 
            query_fetchId = Employees.objects.get(id=employee_id)
        
        except:
            return Response({'Employee id not found in db'}, status=status.HTTP_404_NOT_FOUND)
          
        if query_fetchId:
            time.sleep(1)  
            form_data = request.data
            serializedData = EmployeeSerializer(query_fetchId, data=form_data)
        
            if serializedData.is_valid():
                serializedData.save()
                return Response(serializedData.data, status = status.HTTP_201_CREATED)
        
            else:
                return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)
                
    except Exception as e:
        exception_message = f'Server side isssue !! - {str(e)}'
        return Response({exception_message}, status=status.HTTP_400_BAD_REQUEST)
    
    
# Handle JWT Auth token  
# Handle duplicate user entry un allowed