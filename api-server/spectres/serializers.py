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

    read_only fields: id, zip_url (link to the generated archive with results)
    """
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    species = serializers.ChoiceField(choices=SpeciesChoice.choices, write_only=True, required=True)
    v_start = serializers.FloatField(write_only=True, required=True)
    v_end = serializers.FloatField(write_only=True, required=True)
    database_slug = serializers.CharField(write_only=True, required=True)
    line_cut_off = serializers.FloatField(write_only=True, required=True)
    pressure = serializers.FloatField(write_only=True, required=True)
    density = serializers.FloatField(write_only=True, required=True)
    temperature = serializers.FloatField(write_only=True, required=True)
    target_value = serializers.CharField(write_only=True, required=True)
    download_link = serializers.SerializerMethodField()

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validates that `v_start` is less than or equal to `v_end` in the given attributes.
        """
        if not attrs['v_start'] <= attrs['v_end']:
            raise ValidationError({
                'detail': 'v_start must be less than or equal to v_end for spectral interval'
            })
        return attrs

    def get_download_link(self, obj: Spectre) -> str | None:
        """
        Generates link for downloading archive with output data based on the url of the FieldFile object
        """
        request = self.context.get('request')
        if obj.zip_file and request:
            return request.build_absolute_uri(obj.zip_file.url)
        return None

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
            "download_link",
        ]


class PlotSpectreSerializer(serializers.Serializer):
    pk = serializers.PrimaryKeyRelatedField(queryset=Spectre.objects.all(), required=True)
    v1 = serializers.FloatField(write_only=True, required=True)
    v2 = serializers.FloatField(write_only=True, required=True)

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validates incoming spectral boundaries v1 and v2 for plotting.
        """
        spectre = attrs["pk"]
        v1 = attrs["v1"]
        v2 = attrs["v2"]
        if not spectre.v_start <= v1 < v2:
            raise serializers.ValidationError({"v1": f'Invalid value v1: {v1}: must be less than {v2} and bigger than or '
                                               f'equal to {spectre.v_start}'})
        if not v1 < v2 <= spectre.v_end:
            raise serializers.ValidationError({"v2": f'Invalid value v2: {v2}: must be bigger than {v1} and less than or '
                                               f'equal to {spectre.v_end}'})
        attrs["spectre"] = spectre
        return attrs