# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def register_user(request):
    # if request.method == 'POST':
    #     username = request.data.get('username')
    #     password = request.data.get('password')
    #     confirm_password = request.data.get('confirm_password')
    #     email = request.data.get('email')

    #     if password != confirm_password:
    #         return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
    #     if User.objects.filter(username=username).exists():
    #         return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    #     user = User.objects.create(username=username, password=make_password(password), email=email)
    #     return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    return Response({'message' : 'hello world'})
