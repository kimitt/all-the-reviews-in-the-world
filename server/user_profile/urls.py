from django.urls import path
from .views import ProfileRetrieveAPIView, ProfileFollowAPIView


app_name='user_profile'

urlpatterns = [
    path('profile/(?P<username>\w+)/?$', ProfileRetrieveAPIView.as_view()),
    path('profiles/(?P<username>\w+)/follow/?$', ProfileFollowAPIView.as_view()),
]