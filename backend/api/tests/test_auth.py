from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User


class TestAuth(TestCase):
    
    def setUp(self):
        self.client = Client()
        self.create_url = reverse('create-account')
        self.login_url = reverse('login')
        
        
    # Test valid signup
    def test_signup_POST_success(self):
        data = {
            'username': 'testuser',
            'password': 'testpassword123',
            'email': 'testuser@example.com'
        }
        response = self.client.post(self.create_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects.filter(username='testuser').exists())
        self.assertEqual(response.data['message'], 'User created successfully')
        
    
    # Test missing fields for signup
    def test_signup_POST_missing_field(self):
        data = {
            'username' : 'testuser',
            # missing email and password fields
        }
        response = self.client.post(self.create_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['missing fields'], 'Username, password, and email are all required')
    
    
    # Test if username already exists
    def test_signup_POST_username_exists(self):
        User.objects.create_user(username='testuser', password='testpassword123', email='testuser@example.com')
        data = {
            'username' : 'testuser',
            'password' : 'anothertestpassword123',
            'email' : 'anothertestuser@example.com'
        }
        response = self.client.post(self.create_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertTrue(User.objects.filter(username=data['username']).exists())
        self.assertEqual(response.data['error'], 'Username already exists')
        
        
    # Test if email already exists
    def test_signup_POST_email_exists(self):
        User.objects.create_user(username='testuser', password='testpassword123', email='testuser@example.com')
        data = {
            'username' : 'anothertestuser',
            'password' : 'anothertestpassword123',
            'email' : 'testuser@example.com'
        }
        response = self.client.post(self.create_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertTrue(User.objects.filter(email=data['email']).exists())
        self.assertEqual(response.data['error'], 'Email already exists')
        
    
    # Test if email is not valid email
    def test_signup_POST_invalid_email(self):
        data = {
            'username' : 'testuser',
            'password' : 'testpassword123',
            'email' : 'testuser@.com'
        }
        response = self.client.post(self.create_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.data['error'], 'Enter a valid email address')
        

    def test_login_POST_success(self):
        User.objects.create_user(username='testuser', password='testpassword123', email='testuser@example.com')
        data = {
            'username' : 'testuser',
            'email' : 'testuser@example.com',
            'password' : 'testpassword123'
        }
        response = self.client.post(self.login_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['success'], 'Successful login')
    
    def test_login_POST_missing_field(self):
        data = {
            'username' : 'testuser',
            # Missing email and password fields
        }
        response = self.client.post(self.login_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['missing fields'], 'Username, password, and email are all required')
        
    def test_login_POST_invalid_email(self):
        data = {
            'username' : 'testuser',
            'email' : 'testuser@.com',
            'password' : 'testpassword123'
        }
        response = self.client.post(self.login_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.data['error'], 'Enter a valid email address')
        