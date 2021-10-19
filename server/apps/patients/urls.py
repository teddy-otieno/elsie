from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import EventsViewSet, PatientPostViewSet, PublicEventViewSet, generate_newsfeed

def _router_urls():
    router = DefaultRouter()
    router.register('post', PatientPostViewSet, basename="post")
    router.register('public_events', PublicEventViewSet, basename="public_event")
    router.register('event', EventsViewSet, basename="event")
    return router.urls

urlpatterns = [
        path('news_feed/', generate_newsfeed),
        ]

urlpatterns += _router_urls()
