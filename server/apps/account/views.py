from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import ObtainAccessTokenSerializer, PsychiatrisSerializer, PatientSerializer

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
