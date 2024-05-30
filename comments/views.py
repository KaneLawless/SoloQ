from rest_framework import generics
from .models import Comment
from .serializers.common import CommentSerializer
from lib.permissions import isOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class CommentIndexView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    # add owner
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [isOwnerOrReadOnly]
    