from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.news_list, name='news_list'),
    path('api/notices/', views.get_notices, name='get_notices'),
]
