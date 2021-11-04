from django.urls import path
from rest_framework.routers import DefaultRouter

from apps.account.models import Patient

from .views import (
    QuestionaireViewSet, 
    get_available_appointments, 
    accept_appointment, 
    CommunityViewset, 
    get_patients_stats,
    get_questionnaire_stats, 
    save_responses,
    PatientQuestionnaireViewSet
)

def viewset_routes():
    router = DefaultRouter()
    router.register("community", CommunityViewset, basename="community")
    router.register("questionnaires", QuestionaireViewSet, basename="questionnaire")
    router.register("patient-questionnaires", PatientQuestionnaireViewSet, basename="patient_questionnaires")
    return router.urls


urlpatterns = [
        path('available-appointments/', get_available_appointments),
        path('accept-appointment/<int:id>/', accept_appointment),
        path('patients-stats/', get_patients_stats),
        path('save-response/', save_responses),
        path('questionnaire-stats', get_questionnaire_stats)
        ] 

urlpatterns += viewset_routes()
