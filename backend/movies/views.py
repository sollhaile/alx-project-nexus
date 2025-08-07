from rest_framework import viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.db.models import Count, Avg
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer

# ViewSets for CRUD operations
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    @action(detail=False, methods=['get'])
    def recommendations(self, request):
        # Your existing recommendation logic here
        if not request.user.is_authenticated:
            return Response([])
        
        user_ratings = Rating.objects.filter(user=request.user)
        if user_ratings.exists():
            top_genre = user_ratings.values_list('movie__genres__name', flat=True).annotate(
                count=Count('movie__genres')
            ).order_by('-count').first()
            
            recommended_movies = Movie.objects.filter(genres__name=top_genre).exclude(
                id__in=user_ratings.values_list('movie_id', flat=True)
            )[:10]
        else:
            recommended_movies = Movie.objects.annotate(
                avg_rating=Avg('rating__score')
            ).order_by('-avg_rating')[:10]
        
        serializer = MovieSerializer(recommended_movies, many=True)
        return Response(serializer.data)

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer