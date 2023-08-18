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
    image_url = models.URLField(max_length=200, null=True, blank=True)
    video_url = models.URLField(
        max_length=200, null=True, blank=True)  # 비디오 URL 필드 추가

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.image_url and not self.image:
            # 이미지 주소로부터 이미지를 다운로드하여 저장하는 로직
            try:
                response = requests.get(self.image_url)
                response.raise_for_status()  # 에러가 발생하면 예외를 발생시킴

                # 이미지 파일로 열고 크기를 검사하여 이상한 이미지인지 확인
                img = Image.open(BytesIO(response.content))
                if img.size[0] > 2000 or img.size[1] > 2000:
                    raise ValueError("Image dimensions are too large.")

                content_type = response.headers['content-type']
                extension = content_type.split('/')[-1]  # 이미지 확장자 추출

                # ContentFile을 사용하여 이미지 데이터 저장
                self.image.save(
                    f'user_image.{extension}', ContentFile(response.content), save=False)
            except (requests.RequestException, ValueError) as e:
                print("Error:", e)
                pass  # 에러 처리

        super().save(*args, **kwargs)
