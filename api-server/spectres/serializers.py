"""
Authors:
    Mikhail Razumovskii and Denis Astanin, 2025

Description:
    This module is a part of the MARFA-webapp project.
"""
from typing import Dict, Any

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from spectres.models import Spectre, SpeciesChoice


class SpectreSerializer(serializers.ModelSerializer):
    """
    Serializer for user request for calculation of absorption spectra
    see the post method of .views/SpectreView class
    """
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    species = serializers.ChoiceField(choices=SpeciesChoice.choices, write_only=True, required=True)
    v_start = serializers.FloatField(write_only=True, required=True)
    v_end = serializers.FloatField(write_only=True, required=True)
    database_slug = serializers.CharField(write_only=True, required=True)
    line_cut_off = serializers.IntegerField(write_only=True, required=True)
    pressure = serializers.FloatField(write_only=True, required=True)
    density = serializers.FloatField(write_only=True, required=True)
    temperature = serializers.FloatField(write_only=True, required=True)
    target_value = serializers.CharField(write_only=True, required=True)
    zip_url = serializers.URLField(read_only=True)

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validates that `v_start` is less than or equal to `v_end` in the given attributes.
        """
        if not attrs['v_start'] <= attrs['v_end']:
            raise ValidationError({
                'detail': 'v_start must be less than or equal to v_end for spectral interval'
            })
        return attrs

    class Meta:
        model = Spectre
        fields = [
            "id",
            "species",
            "v_start",
            "v_end",
            "database_slug",
            "line_cut_off",
            "pressure",
            "density",
            "temperature",
            "target_value",
            "zip_url",
        ]
