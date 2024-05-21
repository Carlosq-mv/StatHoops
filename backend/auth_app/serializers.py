from rest_framework import serializers
from django.core.validators import validate_email
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

class CreateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[validate_email])
    
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password' : {'write_only' : True}}

    def validate(self, data):
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({'username' : 'Username already exists'})
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email' : 'Email already exists'})
        return data
    
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'])
        return user

class LoginSerializer(serializers.Serializer):   
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField(required=True, allow_blank=False) 
    username = serializers.CharField(required=True, allow_blank=False)
    password = serializers.CharField(write_only=True, required=True, allow_blank=False)
    
    
    def validate(self, data):
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not (username and password and email):
            raise serializers.ValidationError("Must include 'username', 'email', and 'password'.")
        
        try:
            user = User.objects.get(username=username)
            if user.email != email:
                raise serializers.ValidationError('Invalid email address')
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid credentials')
        
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError('Invalid credentials')
        
        if not user.is_active:
            raise serializers.ValidationError('User is disabled')

        data['user'] = user
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
