from django.db import models
from django.utils import timezone


class Event(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image_url = models.URLField(max_length=800, null=True, default=None)
    video_url = models.URLField(max_length=800, null=True, blank=True)
    start_date = models.DateField(
        null=False, blank=False, default=None)  # 시작 기간 필수 입력
    end_date = models.DateField(
        null=False, blank=False, default=timezone.now)  # 끝나는 기간 필수 입력
    created_at = models.DateTimeField(auto_now_add=True)
    views_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    def increase_views(self):
        self.views_count += 1
        self.save()

    class Meta:
        ordering = ['-created_at']
        # db_table = 'event_board_event'
