from django.urls import path
from . import views

app_name = 'signup'

urlpatterns = [
    path('signup/', views.signup, name='signup'),  # 회원가입 URL
]
