from django.urls import path
from rest_framework.routers import DefaultRouter

from apps.account.models import Patient
from apps.psychiatrist.serializers import BlogPostSerializer

from .views import (
    BlogPostsViewSet,
    PublicBlogViewSet,
    QuestionaireViewSet, 
    get_available_appointments, 
    accept_appointment, 
    CommunityViewset,
    get_blog_stats,
    get_patient_report, 
    get_patients_stats,
    get_questionnaire_stats,
    get_report,
    get_responses, 
    save_responses,
    PatientQuestionnaireViewSet,
    terminate_questionnaire,
    update_view,
    patient_report_data
)

def viewset_routes():
    router = DefaultRouter()
    router.register("community", CommunityViewset, basename="community")
    router.register("questionnaires", QuestionaireViewSet, basename="questionnaire")
    router.register("patient-questionnaires", PatientQuestionnaireViewSet, basename="patient_questionnaires")
    router.register("blog-posts", BlogPostsViewSet, basename="blog_posts")
    router.register("public-blogs", PublicBlogViewSet, basename="public-blog")
    return router.urls


urlpatterns = [
        path('available-appointments/', get_available_appointments),
        path('accept-appointment/<int:id>/', accept_appointment),
        path('patients-stats/', get_patients_stats),
        path('blog-stats/', get_blog_stats),
        path('save-response/', save_responses),
        path('get-responses/<int:q_id>/<int:p_id>/', get_responses),
        path('questionnaire-stats', get_questionnaire_stats),
        path('terminate-questionnaire/<int:id>', terminate_questionnaire),
        path('blog-viewed/<int:id>', update_view),
        path('patient-reports/', patient_report_data),
        path('get-report/<int:id>', get_report),
        path('get-patient-reports/', get_patient_report)
        ] 

urlpatterns += viewset_routes()
