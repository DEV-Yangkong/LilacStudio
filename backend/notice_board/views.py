from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import Http404
from .models import Notice
from .serializers import NoticeSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK


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


class NoticeDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Notice.objects.get(pk=pk)
        except Notice.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        notice = self.get_object(pk)
        serializer = NoticeSerializer(notice)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, pk):
        notice = self.get_object(pk)
        serializer = NoticeSerializer(notice, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
