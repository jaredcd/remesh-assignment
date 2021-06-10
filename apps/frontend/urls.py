from django.urls import path
from . import views


urlpatterns = [
    path('', views.index ),
    path('conversations/<int:id>', views.index ),
]
