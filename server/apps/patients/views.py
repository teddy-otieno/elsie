from datetime import datetime, timedelta

from django.utils import timezone
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.account.models import Patient, Psychiatrist

from .serializers import (
    AppointmentSerializer,
    CommunityMessageSerializer,
    ContactUsSerializer,
    EventSerailizer, 
    FeedPostSerailizer, 
    PostSerializer, 
    CommunitySerializer,
    AppointmentSerializer
        )
from .models import (
    ContactUs,
    PatientDoctorsRating,
    Post, 
    Event, 
    Community, 
    Appointment, 
    CommunityMessage, 
    CommunityMember
        )

# Create your views here.

class PatientPostViewSet(ModelViewSet):
    serializer_class        = PostSerializer
    authentication_classes  = [JWTAuthentication]

    def get_queryset(self):
        return Post.objects.filter(patient__user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["user"] = self.request.user
        return  context

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def generate_newsfeed(request, *args, **kwargs):
    posts_queryset = Post.objects.all().order_by("-created_at")
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
            return Event.objects.filter()
        
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
        message_queryset = CommunityMessage.objects.filter(community=id).order_by('-sent_at')
        data = CommunityMessageSerializer(instance=message_queryset, many=True).data
        return Response(status=status.HTTP_200_OK, data=data)

    else:
        community_instance = Community.objects.get(pk=id)
        serializer = CommunityMessageSerializer(data=request.data, context={"user": request.user, "community": community_instance})
        if serializer.is_valid():
            instance = serializer.save()
            data = CommunityMessageSerializer(instance=instance).data
            return Response(status=status.HTTP_201_CREATED, data=CommunityMessageSerializer(instance=instance).data)

        return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
def register_member_to_community(request, community_id: int, *args, **kwargs):
        try:
            CommunityMember.objects.get_or_create(
                    community=Community.objects.get(pk=community_id),
                    member=request.user
                    )
        except Community.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response()


class ContactUsViewSet(ModelViewSet):
    serializer_class = ContactUsSerializer

    def get_queryset(self):
        return ContactUs.objects.all()

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def delete_message(request, id, *args, **kwargs):

    try:
        CommunityMessage.objects.get(pk=id).delete()
        return Response()
    except CommunityMessage.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"detail": "Failed to delete community message"})


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def update_doctors_ratings(request):

    doctor_id = request.data["doc_id"]
    rating = request.data['rating']

    try:
        psychiatrist_instance = Psychiatrist.objects.get(pk=doctor_id)
        patient_instance = Patient.objects.get(user=request.user)

        doc_instance: PatientDoctorsRating = PatientDoctorsRating.objects.get(doctor=psychiatrist_instance)
        doc_instance.rating = rating
        doc_instance.save()
        return Response()
    
    except PatientDoctorsRating.DoesNotExist:
        PatientDoctorsRating.objects.create(doctor=psychiatrist_instance, rating=rating, patient=patient_instance)
        return Response(status=status.HTTP_201_CREATED)

    except (Patient.DoesNotExist, Psychiatrist.DoesNotExist):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
def get_upcoming_appointments(request, *args, **kwargs):

    user_filter = None
    appointments = None

    if request.user.is_patient:
        user_filter = Patient.objects.get(user=request.user)
        appointments = Appointment.objects.filter(starter=user_filter)
    else:
        user_filter = Psychiatrist.objects.get(user=request.user)
        appointments = Appointment.objects.filter(with_who=user_filter)


    count = 0
    for appointment in appointments:

        diff: timedelta = appointment.time - timezone.now()
        if diff.total_seconds() / (60 * 60) < 2:
            count += 1

    
    return Response(data={
        "upcoming_appointments": count
    })