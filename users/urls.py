from django.urls import path
from .views import RegisterView, ProfileView, FindUserView
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('profile/<int:pk>/', ProfileView.as_view()),
    path('finduser/', FindUserView.as_view())
]