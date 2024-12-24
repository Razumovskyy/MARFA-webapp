from django.conf import settings
from django.db import models


class Spectre(models.Model):
    class SpeciesChoice(models.TextChoices):
        CO2 = "CO2"
        H2O = "H2O"

    class ChiFactorChoice(models.TextChoices):
        TONKOV = "tonkov"
        POLLACK = "pollack"
        PERRIN = "perrin"
        NONE = "none"

    class TargetValueChoice(models.TextChoices):
        VAC = "VAC"
        ACS = "ACS"

    class SpectreTypeChoice(models.TextChoices):
        DEFAULT = "default"
        CUSTOM = "custom"

    species = models.CharField(choices=SpeciesChoice.choices, max_length=8)
    v_start = models.IntegerField()
    v_end = models.IntegerField()
    database_slug = models.CharField(max_length=32)
    line_cut_off = models.CharField(max_length=32)
    chi_factor = models.CharField(blank=True, null=True, choices=ChiFactorChoice.choices, max_length=8)
    target_value = models.CharField(choices=TargetValueChoice.choices, max_length=3)
    file = models.FileField(upload_to="./uploads", blank=True, null=True)
    file_name = models.TextField(max_length=16, blank=True, null=True)
    spectre_type = models.CharField(choices=SpectreTypeChoice.choices, max_length=8)
    zip_url = models.URLField(blank=True, null=True)
