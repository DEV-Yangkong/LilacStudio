from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.news_list, name='news_list'),
    # 다른 URL 패턴들을 여기에 추가할 수 있습니다.
]
