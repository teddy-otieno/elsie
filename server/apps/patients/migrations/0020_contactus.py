# Generated by Django 3.2.7 on 2021-11-09 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0019_rename_date_event_time'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactUs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.CharField(max_length=11)),
                ('message', models.TextField()),
                ('sent_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]