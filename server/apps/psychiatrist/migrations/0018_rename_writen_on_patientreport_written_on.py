# Generated by Django 3.2.7 on 2021-11-13 20:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('psychiatrist', '0017_patientreport_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patientreport',
            old_name='writen_on',
            new_name='written_on',
        ),
    ]