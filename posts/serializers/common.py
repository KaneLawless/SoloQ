from rest_framework import serializers
from ..models import Post
from comments.serializers.common import CommentSerializer
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'