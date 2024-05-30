from django.urls import path
from .views import CategoryIndexView, CategoryDetailView

urlpatterns = [
    path('', CategoryIndexView.as_view()),
    path('<int:pk>/', CategoryDetailView.as_view())
]