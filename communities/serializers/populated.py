from .common import CommunitySerializer
from posts.serializers.populated import PopulatedPostSerializer

class PopulatedCommunitySerializer(CommunitySerializer):
    posts = PopulatedPostSerializer(many=True)