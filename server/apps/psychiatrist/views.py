from datetime import datetime, timedelta, timezone
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.patients.models import Appointment, Community, Event
from apps.account.models import MyUser, Psychiatrist, Patient
from apps.psychiatrist.models import Question, QuestionResponse, Questionnaire, QuestionnaireResponses
from .serializers import PsychiatristAppointmentSerializer, CommunitySerializer, QuestionnaireSerializer, ResponsesSerializer, PatientQuestionnaireSerializer

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_available_appointments(request):

    appointment_queryset = Appointment.objects.filter(status="PENDING").order_by('-status')
    return Response(data=PsychiatristAppointmentSerializer(instance=appointment_queryset, many=True).data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
def accept_appointment(request, id, *args, **kwargs):

    if request.method == "POST":
        meeting_link = request.data.pop("meeting_link", None)
        if meeting_link is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Meeting link was not provided"})

        try:
            psychiatrist_instance = Psychiatrist.objects.get(user=request.user)
            appointment_instance: Appointment =  Appointment.objects.get(pk=id)
            appointment_instance.status = "BOOKED"
            appointment_instance.meeting_link = meeting_link
            appointment_instance.with_who = psychiatrist_instance
            appointment_instance.save()


            # Create event
            instance, created = Event.objects.get_or_create(
                time=appointment_instance.time,
                title="Appointment",
                description=f"Appointment with Dr. {psychiatrist_instance.user.f_name} {psychiatrist_instance.user.l_name}",
                owner = psychiatrist_instance
            )

            if created: instance.save()

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

class PatientQuestionnaireViewSet(ReadOnlyModelViewSet):
    serializer_class = PatientQuestionnaireSerializer
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Questionnaire.objects.all()

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def save_responses(request):

    questionniare_id = request.data.pop('questionnaire_id')
    responses = request.data.pop("responses")
    
    try:
        questionnaire_instance = Questionnaire.objects.get(pk=questionniare_id)

        question_response = QuestionnaireResponses.objects.get(
            questionnaire=questionnaire_instance, 
            is_filled=True, 
            patient=Patient.objects.get(user=request.user)
            )
    except Questionnaire.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND, data={"message": "Invalid questionnaire"})

    except QuestionnaireResponses.DoesNotExist:
        return Response(status=status.HTTP_202_ACCEPTED)


    for response in responses:
        try:
            question_instance = Question.objects.get(pk=int(response["question_id"]))
        except Question.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Invalid question"})

        if question_instance.type == "RANGE":
            QuestionResponse.objects.create(question=question_instance, range_answer=response["response"])

        elif question_instance.type == "SHORTANSWER":
            QuestionResponse.objects.create(question=question_instance, short_answer=response["response"])

    #Register a response
    question_response = QuestionnaireResponses.objects.create(
        questionnaire=questionnaire_instance, 
        is_filled=True, 
        patient=Patient.objects.get(user=request.user)
        )

    return Response(status=status.HTTP_201_CREATED)


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
