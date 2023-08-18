from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from backend import views as backend_views
from notice_board import views as notice_board_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('accounts/signup/', backend_views.signup, name='signup'),
    path('api/v1/notice_board/', notice_board_views.get_notice_board,
         name='notice_board_api'),
    path('api/v1/notice_board/notices/<int:pk>/',
         notice_board_views.NoticeDetailAPIView.as_view(), name='notice_detail_api'),
]
# 개발환경에서 미디어 파일을 제공하기 위한 URL 설정
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
