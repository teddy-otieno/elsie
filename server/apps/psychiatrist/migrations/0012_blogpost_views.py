# Generated by Django 3.2.7 on 2021-11-07 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('psychiatrist', '0011_blogpost'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpost',
            name='views',
            field=models.IntegerField(default=0),
        ),
    ]
