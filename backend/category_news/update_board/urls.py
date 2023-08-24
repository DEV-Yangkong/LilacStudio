from django.urls import path
from .views import get_update_board, UpdateDetailAPIView, IncreaseViews

app_name = 'category_news.update_board'

urlpatterns = [
    path('', get_update_board, name='update_board_api'),
    path('update/<int:pk>/',
         UpdateDetailAPIView.as_view(), name='update_detail_api'),
    #     수정필요할수있음
    path('update/<int:post_id>/increase-views/',
         IncreaseViews.as_view(), name='increase-views'),

]
