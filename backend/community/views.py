from django.shortcuts import render
from .models import Post


def community(request):
    posts = Post.objects.all()
    return render(request, 'community/community.html', {'posts': posts})
