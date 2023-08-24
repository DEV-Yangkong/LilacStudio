from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt


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
