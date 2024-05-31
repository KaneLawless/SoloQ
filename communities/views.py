from rest_framework import generics
from .models import Community
from .serializers.common import CommunitySerializer
from .serializers.populated import PopulatedCommunitySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import isAdminOrReadOnly


class CommunityIndexView(generics.ListCreateAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    


class CommunityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Community.objects.all()
    permission_classes = [isAdminOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PopulatedCommunitySerializer
        return CommunitySerializer