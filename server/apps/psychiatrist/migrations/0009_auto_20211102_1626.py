# Generated by Django 3.2.7 on 2021-11-02 13:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('psychiatrist', '0008_rename_create_on_questionnaire_created_on'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('range_answer', models.IntegerField(null=True)),
                ('short_answer', models.CharField(max_length=4096)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='psychiatrist.question')),
            ],
        ),
        migrations.DeleteModel(
            name='ShortAnswer',
        ),
    ]
