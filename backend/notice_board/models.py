from django.db import models
from django.core.files.base import ContentFile
import requests
from PIL import Image
from io import BytesIO


class Notice(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(
        upload_to='notice_images/', null=True, blank=True)
    image_url = models.URLField(max_length=800, null=True, blank=True)
    video_url = models.URLField(
        max_length=800, null=True, blank=True)
    views_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    def increase_views(self):
        self.views_count += 1
        self.save()

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.image_url and self.image:
            # 이미지 URL이 없고 이미지 파일이 있는 경우에만 실행
            try:
                img = Image.open(self.image)
                if img.size[0] > 2000 or img.size[1] > 2000:
                    raise ValueError("이미지 크기가 너무 큽니다.")

                # 이미지 파일을 새로운 파일명으로 저장
                self.image.save(
                    f'user_image_{self.pk}.jpg', self.image, save=False)
            except (OSError, ValueError) as e:
                print("에러:", e)
                pass  # 에러 처리

        super().save(*args, **kwargs)
