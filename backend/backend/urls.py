from django.contrib import admin
from django.urls import path, include  # include 추가
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('accounts/signup/', views.signup, name='signup'),  # 회원가입 URL

    # 아래 줄을 추가하여 signup 앱의 URL을 포함시킵니다.
    path('accounts/signup/', include('signup.urls')),
]
