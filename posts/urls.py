from django.urls import path
from .views import PostIndexView, PostDetailView, PostInterestView
urlpatterns = [
   path('',PostIndexView.as_view()), # Index View api/posts/
   path('<int:pk>/', PostDetailView.as_view()),
   path('<int:pk>/interest/', PostInterestView.as_view()),
]