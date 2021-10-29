from datetime import datetime, timedelta, timezone
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.patients.models import Appointment, Community
from apps.account.models import MyUser, Psychiatrist
from apps.psychiatrist.models import Questionnaire
from .serializers import PsychiatristAppointmentSerializer, CommunitySerializer, QuestionnaireSerializer

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_available_appointments(request):

    appointment_queryset = Appointment.objects.filter(status="PENDING").order_by('-status')
    return Response(data=PsychiatristAppointmentSerializer(instance=appointment_queryset, many=True).data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
def accept_appointment(request, id, *args, **kwargs):

    if request.method == "POST":
        try:
            psychiatrist_instance = Psychiatrist.objects.get(user=request.user)
            appointment_instance: Appointment =  Appointment.objects.get(pk=id)
            appointment_instance.status = "BOOKED"
            appointment_instance.with_who = psychiatrist_instance
            appointment_instance.save()

            return Response()

        except Psychiatrist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


    else:
        appointment_queryset = Appointment.objects.filter(status="BOOKED", with_who__user=request.user)
        return Response(data=PsychiatristAppointmentSerializer(instance=appointment_queryset, many=True).data, status=status.HTTP_200_OK)

class CommunityViewset(ModelViewSet):
    serializer_class = CommunitySerializer
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Community.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["user"] = self.request.user
        return context


class QuestionaireViewSet(ModelViewSet):
    serializer_class = QuestionnaireSerializer
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Questionnaire.objects.all()

    def get_serializer_context(self):
        context =super().get_serializer_context()
        context['user'] = self.request.user
        return context

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_patients_stats(request):
    patients_query_set = MyUser.objects.filter(is_patient=True)

    total_patients = len(patients_query_set)

    last_week = datetime.now() - timedelta(days=7)
    past_number = len(patients_query_set.filter(created_at__lt=last_week))
    recent_activity = len(patients_query_set.filter(created_at__gt=last_week))

    data = {
        "recent_logins": recent_activity,
        "total_patient": total_patients,
        "percentage": (recent_activity / past_number if past_number > 0 else 1) * 100
    }

    return Response(data=data)