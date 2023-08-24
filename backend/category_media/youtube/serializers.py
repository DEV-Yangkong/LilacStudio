from rest_framework import serializers
from .models import YouTubePost


class YouTubePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = YouTubePost
        fields = '__all__'
