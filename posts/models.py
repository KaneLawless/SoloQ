from django.db import models


class Post(models.Model):
    title = models.CharField()
    text = models.TextField()
    image = models.CharField(blank=True, null=True)
    community = models.ForeignKey('communities.Community', related_name='posts', on_delete=models.CASCADE, blank=True)
    interests = models.ManyToManyField('users.User',related_name='interested_in', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        'users.User',
        related_name='posts_created',
        on_delete=models.CASCADE,
        blank=True)
    categories = models.ManyToManyField('categories.Category', related_name='posts', blank=True)
    
    def __str__(self):
        return f'{self.id} - {self.owner} - {self.community}'
    
    
