from django.shortcuts import render
from .models import TeamInfo


def team_info(request):
    team_info_list = TeamInfo.objects.all()
    return render(request, 'teaminfo/team_info.html', {'team_info_list': team_info_list})
