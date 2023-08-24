from django.urls import path
from . import views

urlpatterns = [
    path('webshop/', views.webshop, name='webshop'),
    # 다른 URL 패턴들을 여기에 추가할 수 있습니다.
]
