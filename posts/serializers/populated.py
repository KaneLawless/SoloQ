from .common import PostSerializer
from comments.serializers.common import CommentSerializer
from categories.serializers.common import CategorySerializer
from communities.serializers.common import CommunitySerializer
from users.serializers.common import RegisterSerializer

class PopulatedPostSerializer(PostSerializer):
    comments = CommentSerializer(many=True)
    categories = CategorySerializer(many=True)
    community = CommunitySerializer()
    owner = RegisterSerializer()
    
    
    