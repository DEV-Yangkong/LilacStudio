from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from backend import views as backend_views  # backend 앱의 views를 가져옴
from notice_board import views as notice_board_views  # notice_board 앱의 views를 가져옴

urlpatterns = [
    path("admin/", admin.site.urls),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('accounts/signup/', backend_views.signup, name='signup'),  # 회원가입 URL 수정
    path('api/v1/notice_board/', notice_board_views.get_notice_board,
         name='notice_board_api'),  # 노티스보드 API URL
]
