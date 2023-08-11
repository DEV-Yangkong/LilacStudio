from django.db import models


class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    bio = models.TextField()
    photo = models.ImageField(upload_to='team_photos/')
    social_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name
