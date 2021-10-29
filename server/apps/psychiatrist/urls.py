from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import QuestionaireViewSet, get_available_appointments, accept_appointment, CommunityViewset, get_patients_stats

def viewset_routes():
    router = DefaultRouter()
    router.register("community", CommunityViewset, basename="community")
    router.register("questionnaires", QuestionaireViewSet, basename="questionnaire")
    return router.urls


urlpatterns = [
        path('available-appointments/', get_available_appointments),
        path('accept-appointment/<int:id>/', accept_appointment),
        path('patients-stats', get_patients_stats)
        ] 

urlpatterns += viewset_routes()
