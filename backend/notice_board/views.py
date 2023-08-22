from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
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
            image_url = request.data.get('image_url')
            user_image_type = request.data.get('user_image_type')

            if user_image_type == 'url':
                serializer.validated_data['image'] = None
            elif user_image_type == 'file':
                # 이미지 파일 첨부 처리
                image_file = request.FILES.get('image')
                if image_file:
                    serializer.validated_data['image'] = image_file
                else:
                    serializer.validated_data['image'] = None

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
        serializer = NoticeSerializer(
            notice, data=request.data, partial=True)  # partial=True 옵션 사용
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        notice = self.get_object(pk)
        notice.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# 수정필요할수있음
class IncreaseViews(APIView):
    def post(self, request, post_id):
        try:
            post = Notice.objects.get(pk=post_id)
            post.views_count += 1
            post.save()
            return Response({"message": "Views count increased successfully."}, status=status.HTTP_200_OK)
        except Notice.DoesNotExist:
            return Response({"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
