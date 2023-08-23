from rest_framework import serializers
from .models import Update


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Update
        fields = '__all__'
        # video_url 필드를 선택적으로 처리하도록 설정
        extra_kwargs = {
            'video_url': {'required': False, 'allow_blank': True}
        }
