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

from .models import Psychiatrist, Patient
# Create your views here.
class AccessTokenObtainPairView(TokenObtainPairView):
	serializer_class = ObtainAccessTokenSerializer

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
def update_psychiatrist(request, *args, **kwargs):

    serializer = PsychiatrisSerializer(
        instance=Psychiatrist.objects.get(user=request.user), 
        data=request.data, 
        partial=True
        )
    
    if serializer.is_valid():
        instance = serializer.save()

        updated_user_data = PsychiatrisSerializer(instance=instance).data
        return Response(status=status.HTTP_200_OK, data=updated_user_data)

    return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_user_data(request, *args, **kwargs):

    id = kwargs.get("id", None)
    if id is None:
        data = None
        if request.user.is_psychiatrist:
            data = PsychiatrisSerializer(instance=Psychiatrist.objects.get(user=request.user)).data

        if request.user.is_patient:
            data = PatientSerializer(instance=Patient.objects.get(user=request.user)).data

        return Response(data=data)
    else:
        #Code path will only load patients details
        data = PatientSerializer(instance=Patient.objects.get(pk=id)).data
        return Response(data=data)
    
@api_view(['POST'])
def create_patient_account(request, **kwargs):
    serializer = PatientSerializer(data=request.data)

    if serializer.is_valid():
        patient_instance = serializer.save()
        token_pair = ObtainAccessTokenSerializer.get_token(patient_instance.user)
        auth_data = {
            "token" : str(token_pair.access_token),
            "is_whom" : is_who(patient_instance.user)
        }

        return Response(status=status.HTTP_201_CREATED, data=auth_data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={ "errors": serializer.errors })

@api_view(['POST'])
def create_counsellor_account(request, **kwargs):
    serializer = PsychiatrisSerializer(data=request.data)
    if serializer.is_valid():
        therapist_instance = serializer.save()
        token_pair = ObtainAccessTokenSerializer.get_token(therapist_instance.user)
        auth_data = {
                "token": str(token_pair.access_token),
                "is_whom": is_who(therapist_instance.user)
                }

        print(auth_data)
        return Response(status=status.HTTP_201_CREATED, data=auth_data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={ "errors": serializer.errors })


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def is_auth(request):
    response_data = { 
        "is_whom": is_who(request.user), 
        "user_data": dict(get_account(request.user))
    }
    return Response(data=response_data)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def add_user_to_community(request, id):
    return Response()
