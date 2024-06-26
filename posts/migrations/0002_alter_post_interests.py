# Generated by Django 5.0.6 on 2024-05-29 13:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='interests',
            field=models.ManyToManyField(blank=True, null=True, related_name='interested_in', to=settings.AUTH_USER_MODEL),
        ),
    ]
