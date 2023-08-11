from django.shortcuts import render
from .models import GameInfo


def game_info(request):
    game_info_list = GameInfo.objects.all()
    return render(request, 'gameinfo/game_info.html', {'game_info_list': game_info_list})
