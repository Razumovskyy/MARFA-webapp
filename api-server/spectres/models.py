"""
Authors:
    Mikhail Razumovskii and Denis Astanin, 2025

Description:
    This module is part of the MARFA-webapp project.
"""
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


VW_VALIDATORS = [MinValueValidator(10), MaxValueValidator(14000)]
LINE_CUT_OFF_VALIDATORS = [MaxValueValidator(500)]
NON_NEGATIVE_VALIDATORS = [MinValueValidator(0.0)]


class SpeciesChoice(models.TextChoices):
    H2O = "H2O", "H₂O"
    CO2 = "CO2", "CO₂"
    O3 = "O3", "O₃"
    N2O = "N2O", "N₂O"
    CO = "CO", "CO"
    CH4 = "CH4", "CH₄"
    O2 = "O2", "O₂"
    NO = "NO", "NO"
    SO2 = "SO2", "SO₂"
    NO2 = "NO2", "NO₂"
    NH3 = "NH3", "NH₃"
    HNO3 = "HNO3", "HNO₃"


class Spectre(models.Model):
    """
        Model containing per-request properties of absorption calculation
    """

    class TargetValueChoice(models.TextChoices):
        VAC = "VAC"
        ACS = "ACS"

    species = models.CharField(choices=SpeciesChoice.choices, max_length=8)
    v_start = models.PositiveIntegerField(default=10, validators=VW_VALIDATORS)
    v_end = models.PositiveIntegerField(default=10, validators=VW_VALIDATORS)
    database_slug = models.CharField(max_length=32)
    line_cut_off = models.PositiveIntegerField(default=25, validators=LINE_CUT_OFF_VALIDATORS)
    pressure = models.FloatField(default=0.0, validators=NON_NEGATIVE_VALIDATORS)
    temperature = models.FloatField(default=0.0, validators=NON_NEGATIVE_VALIDATORS)
    density = models.FloatField(default=0.0, validators=NON_NEGATIVE_VALIDATORS)
    target_value = models.CharField(choices=TargetValueChoice.choices, max_length=3)
    zip_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Calculation Request'
        verbose_name_plural = 'Calculation Requests'

    def __str__(self) -> str:
        return f"Calculation Request({self.species}, {self.v_start} - {self.v_end} cm-1)"
