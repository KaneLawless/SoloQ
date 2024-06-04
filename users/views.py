from rest_framework import generics, views
from .models import User
from .serializers.common import RegisterSerializer
from .serializers.populated import ProfileSerializer
from lib.permissions import isOwnerOrReadOnly
from rest_framework.response import Response
import json

class RegisterView(generics.CreateAPIView):
    model = User
    serializer_class = RegisterSerializer


class ProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class= ProfileSerializer
    permission_classes = [isOwnerOrReadOnly]
    

class FindUserView(views.APIView):
    
    def post(self, request):
       body_unicode = request.body.decode('utf-8')
       body = json.loads(body_unicode)
       email = body['email']
       user = User.objects.filter(email=email)
       if user:
           return Response({"found": "true", "username": user.values('username')[0]['username']})
       else:
           return Response({"found": "false"})
