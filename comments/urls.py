from django.urls import path
from .views import CommentIndexView, CommentDetailView
urlpatterns = [
    path('',CommentIndexView.as_view()),
    path('<int:pk>/',CommentDetailView.as_view())
    ]
