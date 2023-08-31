from django.contrib import admin
from .models import Event


class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'image_url',
                    'created_at', 'start_date', 'end_date', 'views_count')  # 보여질 필드 설정
    search_fields = ('title',)  # 검색 기능 추가
    list_filter = ('created_at', 'start_date', 'end_date')  # 필터 기능 추가
    actions = ['increase_views']

    readonly_fields = ('preview_image', 'link_to_detail')  # 읽기 전용 필드 설정

    # 여러 기능을 위해 해당 모델 어드민에 설정
    fieldsets = [
        (None, {'fields': ['title', 'image_url',
         'content', 'video_url', 'views_count', 'start_date', 'end_date']}),
        ('미리 보기', {'fields': ['preview_image', 'link_to_detail']}),
    ]

    def increase_views(self, request, queryset):
        for post in queryset:
            post.increase_views()
        self.message_user(request, f"Selected posts' views count increased.")
    increase_views.short_description = "Increase views count for selected posts"

    def preview_image(self, obj):  # 미리 보기 이미지
        return obj.image_url if obj.image_url else ''
    preview_image.short_description = '미리 보기 이미지'

    def link_to_detail(self, obj):  # 상세 페이지로 바로 가는 링크
        return f'<a href="/admin/event_board/event/{obj.id}/">링크</a>'
    link_to_detail.short_description = '상세 페이지'
    link_to_detail.allow_tags = True


admin.site.register(Event, EventAdmin)
