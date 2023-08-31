from django.urls import path
from .views import get_gallery_board, GalleryDetailAPIView, IncreaseViews

app_name = 'category_media.gallery_board'

urlpatterns = [
    path('', get_gallery_board, name='gallery_board_api'),
    path('gallery/<int:pk>/', GalleryDetailAPIView.as_view(),
         name='gallery_detail_api'),  # 주소 변경
    path('gallery/<int:post_id>/increase-views/',
         IncreaseViews.as_view(), name='increase-views'),
]
