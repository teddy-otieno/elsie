from datetime import datetime
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import (
    AppointmentSerializer,
    CommunityMessageSerializer,
    EventSerailizer, 
    FeedPostSerailizer, 
    PostSerializer, 
    CommunitySerializer,
    AppointmentSerializer
        )
from .models import Post, Event, Community, Appointment

# Create your views here.

class PatientPostViewSet(ModelViewSet):
    serializer_class        = PostSerializer
    authentication_classes  = [JWTAuthentication]


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
    serializer_class    = EventSerailizer
    authentication      = [JWTAuthentication]

    def get_queryset(self):
        date_string = self.request.query_params.get('date', None)
        if date_string is None:
            return Event.objects.all()
        
        date = datetime.strptime(date_string, "%Y-%m-%d").date()
        return Event.objects.filter(date=date)

class CommunityViewSet(ModelViewSet):
    serializer_class    = CommunitySerializer
    authentication      = [JWTAuthentication]

    def get_queryset(self):
        return Community.objects.all()


class AppointmentViewsSet(ModelViewSet):
    serializer_class = AppointmentSerializer
    authentication = [JWTAuthentication]

    #TODO filter

    def get_queryset(self):
        return Appointment.objects.filter(starter__user=self.request.user).order_by('status')

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'user': self.request.user})

        return context


@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
def messages_view(request, id):

    if request.method == "GET":
        message_queryset = CommunityMessage.objects.filter(community=id)
        data = CommunityMessageSerializer(instance=message_queryset, many=True).data
        return Response(status=status.HTTP_200_OK, data=data)

    else:
        serializer = CommunityMessageSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            data = CommunityMessageSerializer(instance=instance).data
            return Response(status=status.HTTP_201_CREATED, data=data)
