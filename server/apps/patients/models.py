from django.db import models

# Create your models here.

class Post(models.Model):
    title       = models.CharField(max_length=1024)
    text        = models.CharField(max_length=2048)
    patient     = models.ForeignKey('account.Patient', on_delete=models.CASCADE)


class PostLike(models.Model):
    post        = models.ForeignKey('patients.Post', on_delete=models.CASCADE)
    patient     = models.ForeignKey('account.Patient', on_delete=models.CASCADE)


class Comment(models.Model):
    post    = models.ForeignKey('patients.Post', on_delete=models.CASCADE, related_name="comments")
    comment = models.CharField(max_length=2048)
    patient = models.ForeignKey('account.Patient', on_delete=models.CASCADE, related_name="patient_comments")


class Event(models.Model):
    date        = models.DateTimeField()
    title       = models.CharField(max_length=256)
    description = models.CharField(max_length=4096)
    is_public   = models.BooleanField(default=False)
    owner       = models.ForeignKey('account.Psychiatrist', on_delete=models.CASCADE)