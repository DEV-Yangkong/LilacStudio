from django.shortcuts import render
from .models import Media


def media_list(request):
    media_items = Media.objects.all()
    return render(request, 'media/media_list.html', {'media_items': media_items})
