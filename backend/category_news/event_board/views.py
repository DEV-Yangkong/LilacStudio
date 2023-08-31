from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.http import Http404
from .models import Event
from .serializers import EventSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK
from datetime import datetime


@api_view(['GET', 'POST'])
def get_event_board(request):
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        event = self.get_object(pk)
        serializer = EventSerializer(event)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, pk):
        event = self.get_object(pk)
        serializer = EventSerializer(
            event, data=request.data, partial=True)  # partial=True 옵션 사용
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        event = self.get_object(pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IncreaseViews(APIView):
    def get(self, request, post_id):
        try:
            post = Event.objects.get(pk=post_id)
            post.increase_views()
            return Response({"message": "Views count increased successfully."}, status=status.HTTP_200_OK)
        except Event.DoesNotExist:
            return Response({"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, post_id):
        try:
            post = Event.objects.get(pk=post_id)
            post.views_count += 1
            post.save()
            return Response({"message": "Views count increased successfully."}, status=status.HTTP_200_OK)
        except Event.DoesNotExist:
            return Response({"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND)


class CalculateDday(APIView):
    def get(self, request, post_id):
        try:
            post = Event.objects.get(pk=post_id)
            current_date = datetime.now().date()

            if current_date < post.start_date:
                d_day = (post.start_date - current_date).days
                status_text = "이벤트 준비중"
            elif current_date >= post.start_date and current_date <= post.end_date:
                d_day = (post.end_date - current_date).days
                if d_day == 0:
                    status_text = "진행 중"
                else:
                    status_text = f"D-{d_day} 진행 중"
            else:
                status_text = "이벤트 종료"

            return Response(
                {"d_day": d_day, "status_text": status_text,
                    "current_date": current_date},
                status=status.HTTP_200_OK
            )
        except Event.DoesNotExist:
            return Response({"message": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
