from rest_framework import generics
from .models import User
from .serializers.common import RegisterSerializer

class RegisterView(generics.CreateAPIView):
    model = User
    serializer_class = RegisterSerializer
