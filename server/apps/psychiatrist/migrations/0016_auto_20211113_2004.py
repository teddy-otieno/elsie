# Generated by Django 3.2.7 on 2021-11-13 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('psychiatrist', '0015_auto_20211113_1753'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patientreport',
            old_name='remedy',
            new_name='prescription',
        ),
        migrations.AlterField(
            model_name='patientreport',
            name='diagnosis',
            field=models.CharField(max_length=10240),
        ),
    ]