from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from movies.views import MovieViewSet, RatingViewSet
from django.http import HttpResponse

router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'ratings', RatingViewSet)

def home(request):
    return HttpResponse("Welcome to the Movie API!")

urlpatterns = [
     path('', home), 
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/users/', include('users.urls')),

]