from django.urls import path
from .views import notice_board_api

app_name = 'notice_board'

urlpatterns = [
    path('api/v1/notice_board/', notice_board_api, name='notice_board_api'),
]
