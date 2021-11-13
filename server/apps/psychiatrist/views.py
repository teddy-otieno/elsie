from datetime import datetime, timedelta, timezone
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from rest_framework_simplejwt.authentication import JWTAuthentication
from apps.account.serializers import PatientSerializer

from apps.patients.models import Appointment, Community, Event
from apps.account.models import MyUser, Psychiatrist, Patient
from apps.psychiatrist.models import (
        BlogPost, 
        Question, 
        QuestionResponse, 
        Questionnaire, 
        QuestionnaireResponses, 
        PatientReport
        )
from .serializers import (
        BlogPostSerializer, 
        PerPatientQuestionnaireResponse, 
        PsychiatristAppointmentSerializer, 
        CommunitySerializer, 
        QuestionnaireSerializer, 
        ResponsesSerializer, 
        PatientQuestionnaireSerializer,
        PatientReportSerializer
        )

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

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_responses(request, q_id, p_id, *args, **kwargs):
    response_instance = QuestionnaireResponses.objects.get(patient=Patient.objects.get(pk=p_id), pk=q_id)
    answers_query_set=  QuestionResponse.objects.filter(response=response_instance)
    data = [PerPatientQuestionnaireResponse(instance=instance) for instance in answers_query_set]
    return Response(data=data, status=status.HTTP_200_OK)


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

        return Response(status=status.HTTP_202_ACCEPTED)
    except Questionnaire.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND, data={"message": "Invalid questionnaire"})

    except QuestionnaireResponses.DoesNotExist:

        question_response = QuestionnaireResponses.objects.create(
                questionnaire=questionnaire_instance, 
                is_filled=True, 
                patient=Patient.objects.get(user=request.user)
                )

        for response in responses:
            try:
                question_instance = Question.objects.get(pk=int(response["question_id"]))
            except Question.DoesNotExist:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Invalid question"})

            if question_instance.type == "RANGE":
                QuestionResponse.objects.create(question=question_instance, range_answer=response["response"], response=question_response)

            elif question_instance.type == "SHORTANSWER":
                QuestionResponse.objects.create(question=question_instance, short_answer=response["response"], response=question_response)

        #Register a response

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


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_questionnaire_stats(request):

    questionnaire_queryset = Questionnaire.objects.filter(is_active=True, owner=Psychiatrist.objects.get(user=request.user))
    active_questionnaire = len(questionnaire_queryset)

    total_responses = 0

    for questionnaire in questionnaire_queryset:
        total_responses += len(QuestionnaireResponses.objects.filter(questionnaire=questionnaire))

    data = {
            "active": active_questionnaire,
            "responses": total_responses
            }
    return Response(data=data)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_blog_stats(request):

    blogs_queryset = BlogPost.objects.filter(author=Psychiatrist.objects.get(user=request.user))
    no_of_blogs = len(blogs_queryset)
    total_view = 0

    for blog in blogs_queryset:
        total_view += blog.views

    return Response(data={
        "total_views": total_view,
        "blogs": no_of_blogs
        })

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def terminate_questionnaire(request, id, *args, **kwargs):
    try:
        questionnaire_instance: Questionnaire = Questionnaire.objects.get(pk=id)
        questionnaire_instance.is_active = False
        questionnaire_instance.save()
        return Response()
    except Questionnaire.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND, data={"message": "Questionnaire does not exist"})


class BlogPostsViewSet(ModelViewSet):
    serializer_class = BlogPostSerializer
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return BlogPost.objects.filter(author=Psychiatrist.objects.get(user=self.request.user))

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

class PublicBlogViewSet(ReadOnlyModelViewSet):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        return BlogPost.objects.all()


@api_view(['GET'])
def update_view(request, id, *args, **kwargs):

    try:
        blog_instance: BlogPost = BlogPost.objects.get(pk=id)
        blog_instance.views = blog_instance.views + 1
        blog_instance.save()
        return Response()

    except BlogPost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND, data={"detail": "Blog Post not present"})


@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
def patient_report_data(request, *args, **kwargs):
    psychiatrist_instance = Psychiatrist.objects.get(user=request.user)

    def patient_exists(item, ref_list):
        for patient in patients:
            if patient.user.email == item.user.email:
                return True

        return False

    if request.method == "GET":
        # Get the list of patients who have had appointment with this psychiatrist
        appointments_query_set = Appointment.objects.filter(with_who=psychiatrist_instance)

        # Remove duplicates
        duplicates_patients_with_appointments = [appointment.starter for appointment in appointments_query_set]

        patients = []
        for item in duplicates_patients_with_appointments:
            if not patient_exists(item, patients):
                patients.append(item)

        # Get there reports
        patient_reports = []
        for patient in patients:
            try:
                patient_reports.append(PatientReport.objects.get(patient=patient))
            except PatientReport.DoesNotExist:
                continue

        report_data = [PatientReportSerializer(instance=report).data for report in patient_reports]
        patients_data = [PatientSerializer(instance=patient).data for patient in patients]

        result = {
                "report_data": report_data,
                "patients": patients_data
                }
        return Response(data=result)

    else:
        serializer = PatientReportSerializer(data=request.data, context={"user": request.user})

        if serializer.is_valid():
            instance = serializer.save()
            result_data = PatientReportSerializer(instance=instance).data
            return Response(data=result_data, status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
