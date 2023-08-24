from django.urls import path
from .views import get_youtube_posts, YouTubePostDetailAPIView, IncreaseViews

app_name = 'category_media.youtube'

urlpatterns = [
    path('', get_youtube_posts, name='youtube_api'),
    path('post/<int:pk>/', YouTubePostDetailAPIView.as_view(),
         name='youtube_detail_api'),  # 주소 변경
    path('post/<int:post_id>/increase-views/',
         IncreaseViews.as_view(), name='increase-views'),  # 주소 변경
]
