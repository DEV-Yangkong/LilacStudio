from django.urls import path
from .views import get_notice_board, NoticeDetailAPIView, IncreaseViews

app_name = 'category_news.notice_board'

urlpatterns = [
    path('', get_notice_board, name='notice_board_api'),
    path('notice/<int:pk>/',
         NoticeDetailAPIView.as_view(), name='notice_detail_api'),
    path('notice/<int:post_id>/increase-views/',
         IncreaseViews.as_view(), name='increase-views'),

]
