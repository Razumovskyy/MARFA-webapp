"""
Authors:
    Mikhail Razumovskii and Denis Astanin, 2025

Description:
    This module is a part of the MARFA-webapp project.
"""
import subprocess

from django.db import transaction
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle

from spectres.parsers import convert_pttable, plot_parser
from spectres.serializers import SpectreSerializer, PlotSpectreSerializer
from spectres.utils import create_spectre_directory, calculate_absorption_spectre, generate_zip_archive, \
    check_output_files, generate_log_files, generate_plot


@api_view(['POST'])
@throttle_classes([ScopedRateThrottle])
@transaction.atomic
def submit_calculation(request: Request) -> Response:
    """
    Handles a user's request to calculate the absorption spectrum in PT-table format.

    Validates the input data, performs the spectrum calculation, generates log files, generates
    a zipped archive of the results, and updates the database. If an error
    occurs during the calculation or subprocess execution, an appropriate
    error response is returned.

    Args:
        request (Request): The HTTP request object containing the parameters for
                           calculating the absorption spectrum.

    Returns:
        Response: A response object with a 201 status code and serialized
                  data of the successfully created spectrum, or a 500 status
                  code with error details in case of a failure.
    """
    serializer = SpectreSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    spectre = serializer.save()
    spectre_dir = create_spectre_directory(spectre.pk)
    stdout, stderr = "", ""

    try:
        stdout, stderr = calculate_absorption_spectre(spectre)
    except (subprocess.CalledProcessError, subprocess.SubprocessError) as proc_e:
        stderr = getattr(proc_e, "stderr", str(proc_e))
        return Response(
            data={'detail': f'Error occurred while running Fortran executable. Check the {spectre_dir}/stderr.log'
                            f' for details.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    finally:
        generate_log_files(spectre_dir, stdout, stderr)

    check_output_files(spectre_dir)
    convert_pttable(spectre_dir)
    archive_file = generate_zip_archive(spectre_dir)
    spectre.zip_file.name = archive_file.name
    spectre.save()
    serializer = SpectreSerializer(spectre, context={'request': request})
    return Response(status=status.HTTP_201_CREATED, data=serializer.data)


submit_calculation.cls.throttle_scope = 'calculating'


@api_view(['GET'])
@throttle_classes([ScopedRateThrottle])
def get_plot(request: Request) -> Response:
    """
    Handles dynamic data parsing for plots
    """
    serializer = PlotSpectreSerializer(data=request.query_params)
    serializer.is_valid(raise_exception=True)
    validated = serializer.validated_data
    spectre, v1, v2 = validated['spectre'], validated['v1'], validated['v2']
    x_data, y_data = plot_parser(spectre, v1, v2)
    plot = generate_plot(x_data, y_data)
    return Response(status=status.HTTP_200_OK, data={"plot": plot})


get_plot.cls.throttle_scope = 'plotting'
