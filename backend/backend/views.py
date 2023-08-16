from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
# from .models import Notice  # 공지사항 모델 import


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')  # 회원가입 후 홈 페이지로 이동
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

# def get_notices(request):
#     notices = Notice.objects.all()  # 모든 공지사항 가져오기
#     serialized_notices = []  # 직렬화된 공지사항을 저장할 리스트

#     for notice in notices:
#         serialized_notices.append({
#             'id': notice.id,
#             'title': notice.title,
#             'content': notice.content,
#             'created_at': notice.created_at.strftime('%Y-%m-%d %H:%M:%S'),
#         })

#     return JsonResponse(serialized_notices, safe=False)
