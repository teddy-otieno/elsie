# Generated by Django 3.2.7 on 2021-10-29 05:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0015_auto_20211029_0848'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='amount',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
