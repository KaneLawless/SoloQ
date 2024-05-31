from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    bio = models.TextField(max_length=300,blank=True,null=True)
    email = models.EmailField(blank=False,null=False, unique=True)
    username = models.CharField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS= []
    