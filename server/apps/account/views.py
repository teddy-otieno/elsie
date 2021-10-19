from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import (
        ObtainAccessTokenSerializer, 
        PsychiatrisSerializer, 
        PatientSerializer,
        is_who,
        get_account
        )

# Create your views here.
class AccessTokenObtainPairView(TokenObtainPairView):
	serializer_class = ObtainAccessTokenSerializer


@api_view(['POST'])
def create_patient_account(request, **kwargs):

    serializer = PatientSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response()
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={ "errors": serializer.errors })

@api_view(['POST'])
def create_counsellor_account(request, **kwargs):
    serializer = PsychiatrisSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response()
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={ "errors": serializer.errors })
    return Response()


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def is_auth(request):
    response_data = { 
        #"is_who": is_who(request.user), 
        "user_data": dict(get_account(request.user))
    }
    return Response(data=response_data)
