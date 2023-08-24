from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    video_url = models.URLField(max_length=800, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    views_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    def increase_views(self):
        self.views_count += 1
        self.save()

    class Meta:
        ordering = ['-created_at']
