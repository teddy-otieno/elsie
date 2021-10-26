from rest_framework import serializers

from apps.account.serializers import PsychiatrisSerializer
from apps.patients.models import Appointment, Community
from apps.account.models import Psychiatrist

class PsychiatristAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"

class CommunitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Community
        fields = ["name"]

    def create(self, validated_data):
        return self.Meta.model.objects.create(
                **validated_data, 
                creator=Psychiatrist.objects.get(user=self.context.get("user"))
                )
