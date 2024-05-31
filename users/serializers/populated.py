from rest_framework.serializers import ModelSerializer
from ..models import User
from posts.serializers.common import PostSerializer
from comments.serializers.common import CommentSerializer


class ProfileSerializer(ModelSerializer):
    
    posts_created = PostSerializer(many=True)
    comments = CommentSerializer(many=True)
    
    class Meta:
        model = User
        fields =  fields = ('id', 'email', 'username','bio', 'posts_created', 'comments')