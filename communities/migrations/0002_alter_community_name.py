# Generated by Django 5.0.6 on 2024-06-06 12:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
