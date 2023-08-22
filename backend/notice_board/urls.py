from django.urls import path
from .views import get_notice_board, NoticeDetailAPIView, IncreaseViews

app_name = 'notice_board'

urlpatterns = [
    path('api/v1/notice_board/',
         get_notice_board, name='notice_board_api'),
    path('api/v1/notice_board/notice/<int:pk>/',
         NoticeDetailAPIView.as_view(), name='notice_detail_api'),
    #     수정필요할수있음
    path('notice_board/notice/<int:post_id>/increase-views/',
         IncreaseViews.as_view(), name='increase-views'),

]
