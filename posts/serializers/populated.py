from .common import PostSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from categories.serializers.common import CategorySerializer
from communities.serializers.common import CommunitySerializer
from users.serializers.common import RegisterSerializer

class PopulatedPostSerializer(PostSerializer):
    comments = PopulatedCommentSerializer(many=True)
    categories = CategorySerializer(many=True)
    community = CommunitySerializer()
    owner = RegisterSerializer()
    
    
    