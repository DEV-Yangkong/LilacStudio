from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.http import Http404
from .models import Gallery
from .serializers import GallerySerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK


@api_view(['GET', 'POST'])
def get_gallery_board(request):
    if request.method == 'GET':
        galleries = Gallery.objects.all()
        serializer = GallerySerializer(galleries, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = GallerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GalleryDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Gallery.objects.get(pk=pk)
        except Gallery.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        gallery = self.get_object(pk)
        serializer = GallerySerializer(gallery)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, pk):
        gallery = self.get_object(pk)
        serializer = GallerySerializer(
            gallery, data=request.data, partial=True)  # partial=True 옵션 사용
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        gallery = self.get_object(pk)
        gallery.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IncreaseViews(APIView):
    def get(self, request, post_id):
        try:
            post = Gallery.objects.get(pk=post_id)
            post.increase_views()
            return Response({"message": "Views count increased successfully."}, status=status.HTTP_200_OK)
        except Gallery.DoesNotExist:
            return Response({"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, post_id):
        try:
            post = Gallery.objects.get(pk=post_id)
            post.views_count += 1
            post.save()
            return Response({"message": "Views count increased successfully."}, status=status.HTTP_200_OK)
        except Gallery.DoesNotExist:
            return Response({"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND)


