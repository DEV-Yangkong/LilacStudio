from django.urls import path
from .views import get_youtube_posts, YouTubePostDetailAPIView, IncreaseViews

app_name = 'youtube'

urlpatterns = [
    path('api/v1/youtube/', get_youtube_posts, name='youtube_api'),
    path('api/v1/youtube/post/<int:pk>/',
         YouTubePostDetailAPIView.as_view(), name='youtube_detail_api'),
    path('youtube/<int:post_id>/increase-views/',
         IncreaseViews.as_view(), name='increase-views'),
]
