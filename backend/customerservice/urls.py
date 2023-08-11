from django.urls import path
from . import views

urlpatterns = [
    path('customerservice/', views.customer_service, name='customer_service'),
    # 다른 URL 패턴들을 여기에 추가할 수 있습니다.
]
