# Generated by Django 3.2.7 on 2021-11-03 04:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0017_appointment_meeting_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='meeting_link',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
    ]
