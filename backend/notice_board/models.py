from django.db import models


class Notice(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(
        upload_to='notice_images/', null=True, blank=True)  # 이미지 필드 추가
    video_url = models.URLField(
        max_length=200, null=True, blank=True)  # 비디오 URL 필드 추가

    def __str__(self):
        return self.title
