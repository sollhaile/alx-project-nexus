from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL  # Important: Use this instead of direct User import

class Genre(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    genres = models.ManyToManyField(Genre)
    release_date = models.DateField()
    poster_url = models.URLField()
    
    def __str__(self):
        return self.title

class Rating(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='ratings'
    )
    movie = models.ForeignKey(
        Movie,  # Note: Using the class name directly since it's defined above
        on_delete=models.CASCADE,
        related_name='ratings'
    )
    score = models.FloatField(default=0.0)
    
    class Meta:
        unique_together = ('user', 'movie')

class Watchlist(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='watchlist'
    )
    movies = models.ManyToManyField(Movie)  # Class name directly
    
    def __str__(self):
        return f"{self.user.username}'s Watchlist"