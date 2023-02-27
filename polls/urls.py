from django.urls import path
from . import views

urlpatterns = [
    path('polls/', views.polls, name='polls'),
]