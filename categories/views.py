from rest_framework import generics
from .models import Category
from .serializers.common import CategorySerializer
from .serializers.populated import PopulatedCategorySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser


class CategoryIndexView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    
class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PopulatedCategorySerializer
        return CategorySerializer