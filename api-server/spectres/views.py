"""
Authors:
    Mikhail Razumovskii and Denis Astanin, 2025

Description:
    This module is a part of the MARFA-webapp project.
"""
from subprocess import SubprocessError, CalledProcessError

from django.db import transaction
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spectres.parsers import convert_pttable
from spectres.serializers import SpectreSerializer
from spectres.utils import create_spectre_directory, calculate_absorption_spectre, generate_zip_archive, \
    check_output_files


class SpectreView(APIView):
    """
        Views for interaction with spectre model
    """
    serializer_class = SpectreSerializer

    @transaction.atomic
    def post(self, request: Request) -> Response:
        """
        Handles a user's request to calculate the absorption spectrum in PT-table format.

        Validates the input data, performs the spectrum calculation, generates
        a zipped archive of the results, and updates the database. If an error
        occurs during the calculation or subprocess execution, an appropriate
        error response is returned.

        Args:
            request (Request): The HTTP request object containing the parameters for
                               the absorption spectrum calculation.

        Returns:
            Response: A response object with a 201 status code and serialized
                      data of the successfully created spectrum, or a 500 status
                      code with error details in case of a failure.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            spectre = serializer.save()
            spectre_dir = create_spectre_directory(spectre.pk)
            calculate_absorption_spectre(spectre)
            check_output_files(spectre_dir)
            convert_pttable(spectre_dir)
            spectre.zip_url = generate_zip_archive(spectre_dir)
            spectre.save()
            serializer = self.serializer_class(spectre)
            return Response(status=status.HTTP_201_CREATED, data=serializer.data)
        except (CalledProcessError, SubprocessError) as e:
            return Response(
                data={
                    'detail': f'Error occurred while running Fortran executable',
                    'exception': str(repr(e))
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            return Response(data={'exception': f'{type(e).__name__}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request: Request) -> Response:
        """
        Handles dynamic data parsing for plots
        """
        pass
