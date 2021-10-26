from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    EventsViewSet, 
    PatientPostViewSet, 
    PublicEventViewSet, 
    CommunityViewSet,
    AppointmentViewsSet,
    generate_newsfeed,
    messages_view
)

def _router_urls():
    router = DefaultRouter()
    router.register('post', PatientPostViewSet, basename="post")
    router.register('public_events', PublicEventViewSet, basename="public_event")
    router.register('event', EventsViewSet, basename="event")
    router.register('community', CommunityViewSet, basename="community")
    router.register('appointment', AppointmentViewsSet, basename="appointnment")
    return router.urls

urlpatterns = [
        path('news_feed/', generate_newsfeed),
        path('messages/<int:id>/', messages_view),
        ]

urlpatterns += _router_urls()
