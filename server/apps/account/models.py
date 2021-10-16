from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.

class UserManager(BaseUserManager):

    def _create_user(self, **kwargs):
        username = kwargs.get("username")
        email = kwargs.pop("email")
        password = kwargs.get("password")

        if email is None or username is None:
            raise ValueError("User must have an email and username")

        if password is None:
            raise ValueError("Password was not provided")

        user = self.model(email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_patient_user(self, **kwargs):
        return self._create_user(is_patient=True, **kwargs)

    def create_psychiatrist_user(self, **kwargs):
        return self._create_user(is_psychiatrist=True, **kwargs)

    def create_staffuser(self, **kwargs):
        user = self._create_user(**kwargs)
        user.staff = True
        user.save()
        return user

    def create_superuser(self, **kwargs):
        user  = self._create_user(**kwargs)
        user.staff = True
        user.admin = True
        user.save()
        return user

class MyUser(AbstractUser):
    avatar      	= models.ImageField(null=True)
    email       	= models.EmailField(unique=True, max_length=255)
    username    	= models.CharField(max_length=8, unique=True)
    f_name      	= models.CharField(max_length=256)
    l_name      	= models.CharField(max_length=256)
    is_active   	= models.BooleanField(default=True)
    is_patient 		= models.BooleanField(default=False)
    is_psychiatrist = models.BooleanField(default=False)
    staff       	= models.BooleanField(default=False)
    admin       	= models.BooleanField(default=False)
    date_of_birth   = models.DateField()
    phone_number    = models.CharField(max_length=10, null=True, blank=True)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

class Psychiatrist(models.Model):
    qualifications = models.CharField(max_length=256)
    university = models.CharField(max_length=256)

    user = models.OneToOneField(to=MyUser, on_delete=models.CASCADE, related_name="psychiatrist")


class Patient(models.Model):
    user = models.OneToOneField(to=MyUser, on_delete=models.CASCADE, related_name="patient")
