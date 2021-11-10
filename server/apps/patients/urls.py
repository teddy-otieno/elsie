from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ContactUsViewSet,
    EventsViewSet, 
    PatientPostViewSet, 
    PublicEventViewSet, 
    CommunityViewSet,
    AppointmentViewsSet,
    delete_message,
    generate_newsfeed,
    messages_view,
    register_member_to_community,
    update_doctors_ratings
)

def _router_urls():
    router = DefaultRouter()
    router.register('post', PatientPostViewSet, basename="post")
    router.register('public_events', PublicEventViewSet, basename="public_event")
    router.register('event', EventsViewSet, basename="event")
    router.register('community', CommunityViewSet, basename="community")
    router.register('appointment', AppointmentViewsSet, basename="appointnment")
    router.register('contact-us', ContactUsViewSet, "contact-us")
    return router.urls

urlpatterns = [
        path('news_feed/', generate_newsfeed),
        path('messages/<int:id>/', messages_view),
        path('register_member/<int:community_id>/', register_member_to_community),
        path('delete_message/<int:id>', delete_message),
        path('rate-doctor/', update_doctors_ratings)
        ]

urlpatterns += _router_urls()
