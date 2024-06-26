# Generated by Django 5.0.6 on 2024-05-29 13:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0001_initial'),
        ('posts', '0002_alter_post_interests'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='community',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='communities.community'),
        ),
    ]
