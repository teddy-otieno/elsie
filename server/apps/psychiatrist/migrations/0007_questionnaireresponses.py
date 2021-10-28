# Generated by Django 3.2.7 on 2021-10-28 15:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_alter_myuser_phone_number'),
        ('psychiatrist', '0006_alter_questionnaire_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionnaireResponses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_filled', models.BooleanField(default=False)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questionnaire_responses', to='account.patient')),
                ('questionnaire', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='psychiatrist.questionnaire')),
            ],
        ),
    ]
