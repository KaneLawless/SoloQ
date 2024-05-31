from rest_framework import generics
from .models import User
from .serializers.common import RegisterSerializer
from .serializers.populated import ProfileSerializer
from lib.permissions import isOwnerOrReadOnly

class RegisterView(generics.CreateAPIView):
    model = User
    serializer_class = RegisterSerializer


class ProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class= ProfileSerializer
    permission_classes = [isOwnerOrReadOnly]