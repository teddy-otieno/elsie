from django.db import models

# Create your models here.

class Questionnaire(models.Model):
	owner = models.ForeignKey(to="account.Psychiatrist", on_delete=models.CASCADE, related_name="questionaires")
	is_active = models.BooleanField(default=True)
	created_on = models.DateTimeField(auto_now_add=True)
	title = models.CharField(max_length=1024 * 4)

class Question(models.Model):
	ANSWER_TYPE_CHOICES = [
		("RANGE", "RANGE"),
		("SHORTANSWER", "SHORTANSWER")
	]
	questionnaire = models.ForeignKey("psychiatrist.Questionnaire", on_delete=models.CASCADE, related_name="questions")
	question = models.CharField(max_length=1024 * 6)
	type = models.CharField(max_length=20, choices=ANSWER_TYPE_CHOICES)

	min = models.IntegerField(null=True, blank=True)
	max = models.IntegerField(null=True, blank=True)

	min_label = models.CharField(max_length=1024 * 3, null=True, blank=True)
	max_label = models.CharField(max_length=1024 * 3, null=True, blank=True)


class ShortAnswer(models.Model):
	question = models.OneToOneField(to="psychiatrist.Question", on_delete=models.CASCADE, related_name="answer")
	answer = models.CharField(max_length=5 * 1024)

class QuestionnaireResponses(models.Model):
	questionnaire = models.ForeignKey("psychiatrist.Questionnaire", on_delete=models.CASCADE, related_name="responses")
	patient = models.ForeignKey("account.Patient", on_delete=models.CASCADE, related_name="questionnaire_responses")
	is_filled = models.BooleanField(default=False)