from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from backend import views as backend_views
from django.conf import settings
from django.conf.urls.static import static
# 추가한 앱 #
from category_news.notice_board import views as notice_board_views
from category_news.update_board import views as update_board_views
from category_news.event_board import views as event_board_views
from category_media.youtube import views as youtube_views


urlpatterns = [
    path("admin/", admin.site.urls),
    # 회원계정관리 (추가해야함 아직 미구현)
    # path("api/v1/accounts/", include("accounts.urls")),
    # TeamInfo/
    # path("api/v1/team_info/", include("team_info_main.urls")),
    # NEWS
    # NEWS/공지사항
    path("api/v1/notice_board/", include("category_news.notice_board.urls")),
    # NEWS/업데이트
    path("api/v1/update_board/", include("category_news.update_board.urls")),
    # NEWS/이벤트
    path("api/v1/event_board/", include("category_news.event_board.urls")),
    # MEDIA/유튜브
    path("api/v1/youtube/", include("category_media.youtube.urls")),
    # MEDIA/갤러리
    path("api/v1/gallery_board/", include("category_media.gallery_board.urls")),

]
# 개발환경에서 미디어 파일을 제공하기 위한 URL 설정
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
