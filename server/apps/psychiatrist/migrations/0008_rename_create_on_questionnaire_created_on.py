# Generated by Django 3.2.7 on 2021-10-28 15:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('psychiatrist', '0007_questionnaireresponses'),
    ]

    operations = [
        migrations.RenameField(
            model_name='questionnaire',
            old_name='create_on',
            new_name='created_on',
        ),
    ]
