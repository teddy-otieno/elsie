# Generated by Django 3.2.7 on 2021-11-07 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('psychiatrist', '0012_blogpost_views'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpost',
            name='created_on',
            field=models.DateTimeField(auto_now=True),
        ),
    ]