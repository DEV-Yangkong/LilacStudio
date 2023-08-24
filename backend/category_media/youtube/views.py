from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import Http404
from .models import YouTubePost
from .serializers import YouTubePostSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK


@api_view(['GET', 'POST'])
def get_youtube_posts(request):
    if request.method == 'GET':
        youtube_posts = YouTubePost.objects.all()
        serializer = YouTubePostSerializer(youtube_posts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = YouTubePostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class YouTubePostDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return YouTubePost.objects.get(pk=pk)
        except YouTubePost.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        youtube_post = self.get_object(pk)
        serializer = YouTubePostSerializer(youtube_post)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, pk):
        youtube_post = self.get_object(pk)
        serializer = YouTubePostSerializer(
            youtube_post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        youtube_post = self.get_object(pk)
        youtube_post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IncreaseViews(APIView):
    def get(self, request, post_id):
        try:
            post = YouTubePost.objects.get(pk=post_id)
            post.increase_views()
            return Response({"message": "Views count increased successfully."}, status=status.HTTP_200_OK)
        except YouTubePost.DoesNotExist:
            return Response({"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, post_id):
        try:
            post = YouTubePost.objects.get(pk=post_id)
            post.views_count += 1
            post.save()
            return Response({"message": "Views count increased successfully."}, status=status.HTTP_200_OK)
        except YouTubePost.DoesNotExist:
            return Response({"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
