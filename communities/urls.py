from django.urls import path
from .views import CommunityIndexView, CommunityDetailView
urlpatterns = [
    path('', CommunityIndexView.as_view()),
    path('<int:pk>/', CommunityDetailView.as_view())
]