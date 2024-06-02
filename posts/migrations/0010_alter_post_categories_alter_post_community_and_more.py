# Generated by Django 5.0.6 on 2024-06-02 15:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
        ('communities', '0001_initial'),
        ('posts', '0009_post_title'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='categories',
            field=models.ManyToManyField(blank=True, null=True, related_name='posts', to='categories.category'),
        ),
        migrations.AlterField(
            model_name='post',
            name='community',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='communities.community'),
        ),
        migrations.AlterField(
            model_name='post',
            name='interests',
            field=models.ManyToManyField(blank=True, null=True, related_name='interested_in', to=settings.AUTH_USER_MODEL),
        ),
    ]
