from spectres.models import Spectre

from rest_framework import serializers


class SpectreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spectre
        fields = "__all__"


class ProcessDataSerializer(serializers.Serializer):
    v1 = serializers.IntegerField()
    v2 = serializers.IntegerField()
    resolution = serializers.CharField(max_length=64)
    level = serializers.IntegerField()
    id = serializers.IntegerField()

    def validate(self, data):
        try:
            spectre = Spectre.objects.get(pk=data['id'])
        except Spectre.DoesNotExist:
            raise serializers.ValidationError({"id": "Spectre with this ID does not exist."})

        if not (spectre.v_start <= data['v1'] <= spectre.v_end):
            raise serializers.ValidationError(
                {"v1": f"v1 ({data['v1']}) must be between {spectre.v_start} and {spectre.v_end}."})

        if not (spectre.v_start <= data['v2'] <= spectre.v_end):
            raise serializers.ValidationError(
                {"v2": f"v2 ({data['v2']}) must be between {spectre.v_start} and {spectre.v_end}."})

        if data['v1'] > data['v2']:
            raise serializers.ValidationError({"v1": "v1 must be less than or equal to v2."})

        return data

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
