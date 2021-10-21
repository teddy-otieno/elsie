from datetime import datetime
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes

from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import EventSerailizer, FeedPostSerailizer, PostSerializer
from .models import Post, Event

# Create your views here.

class PatientPostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication]


    def get_queryset(self):
        return Post.objects.filter(patient__user=self.request.user)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def generate_newsfeed(request, *args, **kwargs):
    posts_queryset = Post.objects.all()
    serializer = FeedPostSerailizer(instance=posts_queryset, many=True)
    return Response(data=serializer.data)

    # return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PublicEventViewSet(ReadOnlyModelViewSet):
    serializer_class = EventSerailizer

    def get_queryset(self):
        return Event.objects.filter(is_public=True)




class EventsViewSet(ModelViewSet):
    serializer_class = EventSerailizer
    authentication = [JWTAuthentication]

    def get_queryset(self):
        date_string = self.request.query_params.get('date', None)
        if date_string is None:
            return Event.objects.all()
        
        date = datetime.strptime(date_string, "%Y-%m-%d").date()
        return Event.objects.filter(date=date)