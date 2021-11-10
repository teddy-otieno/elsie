from django.db import models

# Create your models here.

class Post(models.Model):
    title       = models.CharField(max_length=1024)
    text        = models.CharField(max_length=2048)
    created_at   = models.DateTimeField(auto_now_add=True)
    patient     = models.ForeignKey('account.Patient', on_delete=models.CASCADE)


class Transaction(models.Model):
    t_id = models.CharField(max_length=1024)
    amount = models.IntegerField()
class PostLike(models.Model):
    post        = models.ForeignKey('patients.Post', on_delete=models.CASCADE)
    patient     = models.ForeignKey('account.Patient', on_delete=models.CASCADE)


class Comment(models.Model):
    post        = models.ForeignKey('patients.Post', on_delete=models.CASCADE, related_name="comments")
    comment     = models.CharField(max_length=2048)
    patient     = models.ForeignKey('account.Patient', on_delete=models.CASCADE, related_name="patient_comments")


class Event(models.Model):
    time        = models.DateTimeField()
    title       = models.CharField(max_length=256)
    description = models.CharField(max_length=4096)
    is_public   = models.BooleanField(default=False)
    owner       = models.ForeignKey('account.Psychiatrist', on_delete=models.CASCADE)

class Community(models.Model):
    avatar  = models.ImageField()
    name    = models.CharField(max_length=1024, unique=True)
    creator  = models.ForeignKey(to='account.Psychiatrist', on_delete=models.CASCADE)

class CommunityMember(models.Model):
    member          = models.ForeignKey(to="account.MyUser", on_delete=models.CASCADE, related_name="member_of")
    community       = models.ForeignKey(to="patients.Community", on_delete=models.CASCADE, related_name="community_members")
    joined_on       = models.DateTimeField(auto_now_add=True)

class CommunityMessage(models.Model):
    message         = models.CharField(max_length=4096)
    sender          = models.ForeignKey(to="account.MyUser", on_delete=models.CASCADE, related_name="messages")
    sent_at         = models.DateTimeField(auto_now_add=True)
    community       = models.ForeignKey(to="patients.Community", on_delete=models.CASCADE, related_name="chat_room")

class Appointment(models.Model):
    APPOINTMENT_STATUS = [
            ("PENDING", "PENDING"),
            ("EXPIRED", "EXPIRED"),
            ("DRAFT", "DRAFT"),
            ("DONE", "DONE"),
            ("BOOKED", "BOOKED")
            ]

    starter         = models.ForeignKey(to="account.Patient", on_delete=models.CASCADE, related_name="patient_appointments");
    status          = models.CharField(max_length=10, choices=APPOINTMENT_STATUS, default="PENDING")
    with_who        = models.ForeignKey(to="account.Psychiatrist", on_delete=models.CASCADE, related_name="appointment_with", null=True, blank=True)
    time            = models.DateTimeField()
    meeting_link    = models.CharField(max_length=1024, null=True, blank=True) # Note Meeting link can be provided later before the booking day
    created_time    = models.DateTimeField(auto_now_add=True)
    transaction     = models.OneToOneField(to="patients.Transaction", on_delete=models.SET_NULL, null=True, blank=False, related_name="transaction")


class ContactUs(models.Model):
    name            = models.CharField(max_length=256)
    email           = models.EmailField()
    phone_number    = models.CharField(max_length=11)
    message         = models.TextField()
    sent_on         = models.DateTimeField(auto_now_add=True)


class PatientDoctorsRating(models.Model):
    rating = models.IntegerField()
    patient = models.ForeignKey('account.Patient', on_delete=models.CASCADE)
    doctor = models.ForeignKey('account.Psychiatrist', on_delete=models.CASCADE)