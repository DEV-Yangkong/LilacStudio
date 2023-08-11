from django.shortcuts import render
from .models import Inquiry


def customer_service(request):
    inquiries = Inquiry.objects.all()
    return render(request, 'customerservice/customer_service.html', {'inquiries': inquiries})
