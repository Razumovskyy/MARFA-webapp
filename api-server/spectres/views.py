import shutil

from django.core.files.storage import FileSystemStorage
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from spectres.models import Spectre
from spectres.serializers import SpectreSerializer, ProcessDataSerializer
import subprocess
import os

from marfa_app.settings import calculating_static, atmospheres_static, CURRENT_HOST, MEDIA_ROOT


class SpectreView(APIView):
    serializer_class = SpectreSerializer

    def post(self, request):
        ser = SpectreSerializer(data=request.data)
        if ser.is_valid():
            data = ser.validated_data
            spectre = ser.save()
            complete_dir = os.path.join(calculating_static, str(spectre.pk))
            os.makedirs(complete_dir, exist_ok=True)
            os.makedirs(f'../MARFA/users/{spectre.pk}/ptTables')
            os.makedirs(f'../MARFA/users/{spectre.pk}/plots')
            os.makedirs(f'../MARFA/users/{spectre.pk}/processedData')
            if spectre.spectre_type == 'default':
                shutil.copy(atmospheres_static + spectre.file_name, os.path.join(complete_dir, spectre.file_name))
            else:
                fs = FileSystemStorage(location=complete_dir)
                fs.save(spectre.file_name, data['file'])
            command = (f'cd ../MARFA && fpm run marfa -- '
                       f'{spectre.species} {spectre.v_start} {spectre.v_end} '
                       f'{spectre.database_slug} {spectre.line_cut_off} {spectre.chi_factor} '
                       f'{spectre.target_value} {spectre.file_name} {spectre.pk}')
            process = subprocess.run(command, shell=True, capture_output=True, text=True)
            print(command)
            '''if process.returncode != 0:
                return Response(
                    status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                    data={"detail": f"Subprocess execution failed"}
                )'''
            pt_tables_dir = f'{MEDIA_ROOT}/{spectre.pk}/ptTables'
            zip_filename = f'ptTables.zip'
            zip_path = f'{MEDIA_ROOT}/{spectre.pk}/{zip_filename}'
            shutil.make_archive(zip_path.replace('.zip', ''), 'zip', pt_tables_dir)
            spectre.zip_url = f'{CURRENT_HOST}/media/{spectre.pk}/{zip_filename}'
            spectre.save()
            return Response(status=status.HTTP_201_CREATED, data=SpectreSerializer(spectre).data)
        return Response(status=status.HTTP_400_BAD_REQUEST, data=ser.errors)

    def put(self, request):
        ser = ProcessDataSerializer(data=request.data)
        if ser.is_valid():
            data = ser.validated_data
            command = (f'cd ../MARFA && python scripts/postprocess.py '
                       f'--uuid {data["id"]} --v1 {data["v1"]} --v2 {data["v2"]} --level {data["level"]}'
                       f' --resolution {data["resolution"]} --plot')
            print(command)
            process = subprocess.run(command, shell=True, capture_output=True, text=True)
            spectre = Spectre.objects.get(pk=data["id"])
            file_name = f'{spectre.species}_{data["level"]}_{spectre.target_value}_{data["v1"]}-{data["v2"]}'
            plot_path = f'{CURRENT_HOST}/media/{spectre.pk}/plots/{file_name}.png'
            data_path = f'{CURRENT_HOST}/media/{data["id"]}/processedData/{file_name}.dat'
            return Response(status=status.HTTP_200_OK,
                            data={"plot_url": plot_path, "data_url": data_path})
        return Response(status=status.HTTP_400_BAD_REQUEST, data=ser.errors)
