from django.contrib import admin
from .models import Update
from django.urls import reverse
from django.template.response import TemplateResponse
from django.contrib.admin.views.main import ChangeList


class UpdateChangeList(ChangeList):
    def url_for_result(self, result):
        pk = getattr(result, self.pk_attname)
        return reverse('admin:update_board_update_change', args=[pk])


@admin.register(Update)
class UpdateAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'subtitle', 'created_at', 'views_count')
    search_fields = ('title',)
    list_filter = ('created_at',)
    actions = ['increase_views']

    def increase_views(self, request, queryset):
        for post in queryset:
            post.increase_views()
        self.message_user(request, f"Selected posts' views count increased.")
    increase_views.short_description = "Increase views count for selected posts"

    def preview_image(self, obj):
        return obj.image.url if obj.image else ''
    preview_image.short_description = '미리 보기 이미지'

    def link_to_detail(self, obj):
        return f'<a href="/admin/update_board/update/{obj.id}/">링크</a>'
    link_to_detail.short_description = '상세 페이지'
    link_to_detail.allow_tags = True

    readonly_fields = ('preview_image', 'link_to_detail', 'created_at')
    fieldsets = [
        (None, {'fields': ['title', 'subtitle', 'content', 'created_at',
                           'image', 'image_url', 'video_url', 'views_count']}),
        ('미리 보기', {'fields': ['preview_image', 'link_to_detail']}),
    ]

    def get_changelist(self, request, **kwargs):
        return UpdateChangeList

    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['show_save'] = False
        return super().change_view(
            request, object_id, form_url, extra_context=extra_context
        )

    def save_model(self, request, obj, form, change):
        # 수정 사항을 저장하지 않고 수정 작업을 기록
        obj.change_reason = "수정되었습니다."
        obj.save()

    def response_change(self, request, obj):
        opts = self.model._meta
        return TemplateResponse(request, 'admin/update_change_form.html', {
            'title': 'Update',
            'adminform': None,
            'object_id': obj.pk,
            'original': obj,
            'is_popup': "_popup" in request.GET,
            'media': self.media,
            'errors': None,
            'root_path': self.admin_site.root_path,
            'app_label': opts.app_label,
            'opts': opts,
            'preserve_filters': self.get_preserved_filters(request),
        })
