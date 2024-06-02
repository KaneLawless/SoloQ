from rest_framework import serializers
from ..models import Comment
from users.serializers.common import RegisterSerializer

class PopulatedCommentSerializer(serializers.ModelSerializer):
    owner = RegisterSerializer()
    class Meta:
        model = Comment
        fields = '__all__'
        