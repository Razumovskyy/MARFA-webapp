"""
Authors:
    Mikhail Razumovskii and Denis Astanin, 2025

Description:
    This module is a part of the MARFA-webapp project.
"""
from django.urls import path

from spectres.views import SpectreView

urlpatterns = [
    path('calculate_spectre/', SpectreView.as_view())
]
