from datetime import timezone
from django.utils import timezone
from apps.patients.models import Appointment
from django.core.mail import send_mail

def send_reminders():
    appointments = Appointment.objects.filter()

    for appointment in appointments:
        if (appointment.time - timezone.now()).hours < 2:
            send_mail("Reminder", f"You have and appointment with {'Dr Who'} at {appointment.time}", fail_silently=True)
