from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Post
from .serializers.common import PostSerializer
from .serializers.populated import PopulatedPostSerializer
from lib.permissions import isOwnerOrReadOnly

# List, Create
class PostIndexView(generics.ListCreateAPIView):
    queryset=Post.objects.all()
    serializer_class = PopulatedPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        
        
#Read Single, Update, Delete 
class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    permission_classes = [isOwnerOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PopulatedPostSerializer
        return PostSerializer
    

# Show interest (like)
class PostInterestView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def patch(self, request, pk):
        post = self.get_object()
        interests_list = post.interests.all()
        
        if request.user in interests_list:
            post.interests.remove(request.user)
            post.save()
            return Response(status=204)
        
        else:
            post.interests.add(request.user)
            post.save()
            return Response(status=201)