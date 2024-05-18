from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

@api_view(['POST'])
def create_account(request):
    if request.method == 'POST':
        username, password, email = request.data.get('username'), request.data.get('password'), request.data.get('email')
        if not all ([username, password, email]):
            return Response({'missing fields' : 'Username, password, and email are all required'}, status=status.HTTP_400_BAD_REQUEST) 
        
        if User.objects.filter(username=username).exists():
            return Response({'error' : 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'error' : 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            validate_email(email)
        except ValidationError as e:
            return Response({'error' : 'Enter a valid email address'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            new_user = User.objects.create_user(username=username, password=password, email=email)
            new_user.save()
            return Response({'message': 'User created successfully', 'user': {'id': new_user.id, 'username': new_user.username, 'email': new_user.email}}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error' : f'Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username, password, email = request.data.get('username'), request.data.get('password'), request.data.get('email')
        
        if not all ([username, password, email]):
            return Response({'missing fields' : 'Username, password, and email are all required'}, status=status.HTTP_400_BAD_REQUEST) 
        
        try:
            validate_email(email)
        except ValidationError as e:
            return Response({'error' : 'Enter a valid email address'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        user = authenticate(username=username, email=email, password=password)
        
        if user is not None:
            return Response({'success' : 'Successful login', 'user': {'id': user.id, 'username': user.username, 'email': user.email}}, status=status.HTTP_200_OK)
        else:
            return Response({'error' : 'Error in logging in '}, status=status.HTTP_400_BAD_REQUEST)