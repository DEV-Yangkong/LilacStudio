from django.db import models


class NewsArticle(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateField()

    def __str__(self):
        return self.title
