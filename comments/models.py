from django.db import models

class Comment(models.Model):
    text=models.TextField()
    owner = models.ForeignKey('users.User',related_name='comments', on_delete=models.SET_NULL, blank=True, null=True)
    post = models.ForeignKey('posts.Post', related_name='comments', on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f'#{self.id} - User: {self.owner}'