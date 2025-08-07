from django.contrib import admin
from .models import Genre, Movie, Rating, Watchlist

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    pass

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    pass

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    pass

@admin.register(Watchlist)
class WatchlistAdmin(admin.ModelAdmin):
    pass