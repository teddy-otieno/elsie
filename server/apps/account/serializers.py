from typing import Dict, Any
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.patients.models import PatientDoctorsRating

from .models import MyUser, Psychiatrist, Patient

def is_who(user: MyUser) -> str:
    return "patient" if user.is_patient else "psychiatrist"


def get_account(user: MyUser) -> Dict[str, Any]: 
    return UserSerializer(instance=user).data

class ObtainAccessTokenSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        response_data = { 
                "token": data["access"], 
                "is_who": is_who(self.user), 
                "user_data": dict(get_account(self.user))
                }
        print(response_data)

        return response_data

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = [
                "id",
                "email", 
                "f_name", 
                "l_name", 
                "password", 
                "phone_number", 
                ]
        read_only_fields = ["id"]
        extra_kwargs = {
                "password": {"write_only": True},
                }


    def update(self, instance, validated_data):
        return instance
class PsychiatrisSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Psychiatrist
        fields = "__all__"

    def create(self, validated_data):
        user = validated_data.pop("user")
        user_instance = MyUser.objects.create_psychiatrist_user(**user)

        return self.Meta.model.objects.create(**validated_data, user=user_instance)

    def update(self, instance, validated_data):

        user_data = validated_data.pop('user', None)
        user_instance = instance.user

        instance.bio = validated_data.pop('bio', instance.bio)
        if user_data is not None:
            user_instance.email = user_data.pop('email', user_instance.email)

            password = user_data.pop('password', None)

            if password is not None:
                user_instance.set_password(password)

        instance.save()
        return instance

    def to_representation(self, instance):
        result = super().to_representation(instance)

        # Load ratings
        # Divide by the average

        ratings_queryset = PatientDoctorsRating.objects.filter(doctor=instance)
        total_rating = 0
        for rating in ratings_queryset:
            total_rating += rating.rating

        avg_rating = total_rating / (len(ratings_queryset) if len(ratings_queryset) > 0 else 1)

        result["rating"] = avg_rating

        return result

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Patient
        fields = "__all__"


    def create(self, validated_data):
        user = validated_data.pop("user")
        user_instance = MyUser.objects.create_patient_user(**user)

        return self.Meta.model.objects.create(**validated_data, user=user_instance)
