from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.http import Http404
from .models import Update
from .serializers import UpdateSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK


@api_view(['GET', 'POST'])
def get_update_board(request):
    if request.method == 'GET':
        updates = Update.objects.all()
        serializer = UpdateSerializer(updates, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UpdateSerializer(data=request.data)
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


class UpdateDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Update.objects.get(pk=pk)
        except Update.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        update = self.get_object(pk)
        serializer = UpdateSerializer(update)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, pk):
        update = self.get_object(pk)
        serializer = UpdateSerializer(
            update, data=request.data, partial=True)  # partial=True 옵션 사용
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        update = self.get_object(pk)
        update.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IncreaseViews(APIView):
    def get(self, request, post_id):
        try:
            post = Update.objects.get(pk=post_id)
            post.increase_views()
            return Response({"message": "Views count increased successfully."}, status=status.HTTP_200_OK)
        except Update.DoesNotExist:
            return Response({"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, post_id):
        try:
            post = Update.objects.get(pk=post_id)
            post.views_count += 1
            post.save()
            return Response({"message": "Views count increased successfully."}, status=status.HTTP_200_OK)
        except Update.DoesNotExist:
            return Response({"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
