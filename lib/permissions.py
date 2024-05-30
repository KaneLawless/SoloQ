from rest_framework.permissions import BasePermission, SAFE_METHODS


class isOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # get, head or options
        if request.method in SAFE_METHODS:
            return True
        # other
        return request.user == obj.owner
