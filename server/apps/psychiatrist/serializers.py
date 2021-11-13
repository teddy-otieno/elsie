from rest_framework import serializers
from rest_framework.response import Response

from apps.account.serializers import PsychiatrisSerializer, PatientSerializer
from apps.patients.models import Appointment, Community
from apps.account.models import Psychiatrist

from .models import (
        BlogPost, 
        Questionnaire, 
        Question, 
        QuestionnaireResponses, 
        QuestionResponse,
        PatientReport
        )

class PsychiatristAppointmentSerializer(serializers.ModelSerializer):
    starter = PatientSerializer(read_only=True)

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


class PerPatientQuestionnaireResponse(serializers.ModelSerializer):
    pass
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"
        read_only_fields = ["questionnaire"]
class ResponsesSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    class Meta:
        model = QuestionnaireResponses
        fields = "__all__"

class PatientQuestionnaireSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    owner = PsychiatrisSerializer(read_only=True)

    class Meta:
        model = Questionnaire
        fields = "__all__"

    def to_representation(self, instance: Questionnaire):
        data = super().to_representation(instance)

        try:
            response_instance: QuestionnaireResponses = QuestionnaireResponses.objects.get(questionnaire=instance.pk)
            data["is_filled"] = response_instance.is_filled
            data["report_available"] = False
        except QuestionnaireResponses.DoesNotExist:
            data["is_filled"] = False

        return data

class QuestionnaireSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    owner = PsychiatrisSerializer(read_only=True)
    responses = ResponsesSerializer(many=True, read_only=True)

    class Meta:
        model = Questionnaire
        fields = "__all__"
        read_only_fields = ["created_on"]

    def create(self, validated_data):
        psychiatrist_instance = Psychiatrist.objects.get(user=self.context["user"])
        questions = validated_data.pop("questions")
        questionnaire_instance = self.Meta.model.objects.create(owner=psychiatrist_instance, **validated_data)
        [Question.objects.create(**question, questionnaire=questionnaire_instance) for question in questions]

        return questionnaire_instance


class BlogPostSerializer(serializers.ModelSerializer):
    author = PsychiatrisSerializer(read_only=True)
    class Meta:
        model = BlogPost
        fields = "__all__"
        read_only_fields = ["author"]

    def create(self, validated_data):
        return self.Meta.model.objects.create(**validated_data, author=Psychiatrist.objects.get(user=self.context['user']))


class PatientReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientReport
        fields = ["diagnosis", "prescription", "description", "written_on", "patient"]
        read_only_fields = ["written_on"]

    def create(self, validated_data):
        author = Psychiatrist.objects.get(user=self.context["user"])

        return self.Meta.model.objects.create(**validated_data, author=author)
