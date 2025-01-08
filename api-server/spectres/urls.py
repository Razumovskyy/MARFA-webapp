"""
Authors:
    Mikhail Razumovskii and Denis Astanin, 2025

Description:
    This module is a part of the MARFA-webapp project.
"""
from django.urls import path
from spectres.views import submit_calculation, get_plot

urlpatterns = [
    path('calculate_spectre/', submit_calculation),
    path('get_plot/', get_plot)
]
