from django.urls import path
from .views import get_event_board, EventDetailAPIView, IncreaseViews, CalculateDday

app_name = 'category_news.event_board'

urlpatterns = [
    path('', get_event_board, name='event_board_api'),
    path('event/<int:pk>/', EventDetailAPIView.as_view(),
         name='event_detail_api'),  # 주소 변경
    path('event/<int:post_id>/increase-views/',
         IncreaseViews.as_view(), name='increase-views'),
     path('event/<int:post_id>/calculate-d-day/', CalculateDday.as_view(), name='calculate-d-day'),
]
