from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import get_available_appointments, accept_appointment, CommunityViewset

def viewset_routes():
    router = DefaultRouter()
    router.register("community", CommunityViewset, basename="community")
    return router.urls


urlpatterns = [
        path('available-appointments/', get_available_appointments),
        path('accept-appointment/<int:id>/', accept_appointment)
        ] 

urlpatterns += viewset_routes()
