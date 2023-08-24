from django.shortcuts import render
from .models import Product


def webshop(request):
    products = Product.objects.all()
    return render(request, 'webshop/webshop.html', {'products': products})
