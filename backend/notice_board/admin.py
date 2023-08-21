from django.contrib import admin
from .models import Notice


class NoticeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at')  # 보여질 필드 설정
    search_fields = ('title',)  # 검색 기능 추가
    list_filter = ('created_at',)  # 필터 기능 추가

    def preview_image(self, obj):  # 미리 보기 이미지
        return obj.image.url if obj.image else ''
    preview_image.short_description = '미리 보기 이미지'

    def link_to_detail(self, obj):  # 상세 페이지로 바로 가는 링크
        return f'<a href="/admin/notice_board/notice/{obj.id}/">링크</a>'
    link_to_detail.short_description = '상세 페이지'
    link_to_detail.allow_tags = True

    readonly_fields = ('preview_image', 'link_to_detail')  # 읽기 전용 필드 설정

    # 여러 기능을 위해 해당 모델 어드민에 설정
    fieldsets = [
        (None, {'fields': ['title', 'content',
         'image', 'image_url', 'video_url']}),
        ('미리 보기', {'fields': ['preview_image', 'link_to_detail']}),
    ]


admin.site.register(Notice, NoticeAdmin)
