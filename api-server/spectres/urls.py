from django.conf.urls.static import static
from django.urls import path

from spectres.views import SpectreView

urlpatterns = [
    path('calculate_spectre/', SpectreView.as_view())
]