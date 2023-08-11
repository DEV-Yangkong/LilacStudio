from django.db import models


class Media(models.Model):
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='media/')

    def __str__(self):
        return self.title
