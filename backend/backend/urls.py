from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from backend import views as backend_views
from django.conf import settings
from django.conf.urls.static import static
# 추가한 앱 #
from notice_board import views as notice_board_views
from youtube import views as youtube_views


urlpatterns = [
    path("admin/", admin.site.urls),
    # 회원계정관리 (추가해야함 아직 미구현)
    # path("api/v1/accounts/", include("accounts.urls")),
    # NEWS
    # NEWS/공지사항
    path("api/v1/notice_board/", include("notice_board.urls")),
    # NEWS/업데이트
    path("api/v1/update_board/", include("update_board.urls")),
    #     유튜브
    path("api/v1/youtube/", include("youtube.urls")),

]
# 개발환경에서 미디어 파일을 제공하기 위한 URL 설정
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
