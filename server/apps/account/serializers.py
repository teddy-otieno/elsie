from typing import Dict, Any
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
                "date_of_birth", 
                "phone_number",
                "username"
                ]
        read_only_fields = ["id"]
        extra_kwargs = {
                "password": {"write_only": True},
                }


class PsychiatrisSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Psychiatrist
        fields = "__all__"

    def create(self, validated_data):
        user = validated_data.pop("user")
        password = user.pop("password")
        assert(password is not None)

        user_instance = MyUser.objects.create_psychiatrist_user(**user)
        user_instance.set_password(password)
        user_instance.save()

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Patient
        fields = "__all__"


    def create(self, validated_data):
        user = validated_data.pop("user")
        user_instance = MyUser.objects.create_patient_user(**user)

        return self.Meta.model.objects.create(**validated_data, user=user_instance)
repr(PatientSerializer)
