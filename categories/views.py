from rest_framework import generics
from .models import Category
from .serializers.common import CategorySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser

class CategoryIndexView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    
class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
