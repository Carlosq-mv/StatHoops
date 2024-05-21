from http.client import responses
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from .serializers import CreateUserSerializer, LoginSerializer


class TestAuth(TestCase):

    def setUp(self):
        self.client = Client()
        self.create_url = reverse('create-account')
        self.login_url = reverse('login-user')

    def create_test_user(self):
        user = User.objects.create_user(username='TestUser', email='test@gmail.com', password='1234')
        return user

    # Test valid signup
    def test_signup_POST_success(self):
        data = {
            'username': 'testuser',
            'email': 'test@gmail.com',
            'password': '1234'
        }

        response = self.client.post(self.create_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects.filter(username='testuser').exists())
        self.assertEqual(response.data['message'], 'User created successfully')

    def test_signup_POST_missing_field(self):
        data = {
            'username' : 'testuser',
            'password' : '1234'
            # missing email field
        }
        response = self.client.post(self.create_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signup_POST_username_exists(self):
        user = self.create_test_user()
        data = {
            'username': 'TestUser',
            'email': 'anothertest@gmail.com',
            'password': '1234'
        }
        response = self.client.post(self.create_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signup_email_exists(self):
        user = self.create_test_user()
        data = {
            'username': 'testuser',
            'email': 'test@gmail.com',
            'password': '1234'
        }
        response = self.client.post(self.create_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signup_POST_invalid_email(self):
        data = {
            'username': 'testuser',
            'email':  'testgmail.com',
            'password': '1234'
        }
        response = self.client.post(self.create_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
