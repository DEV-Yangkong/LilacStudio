from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Notice
from .serializers import NoticeSerializer
from rest_framework import status


@api_view(['GET', 'POST'])
def get_notice_board(request):
    if request.method == 'GET':
        notices = Notice.objects.all()
        serializer = NoticeSerializer(notices, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = NoticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
