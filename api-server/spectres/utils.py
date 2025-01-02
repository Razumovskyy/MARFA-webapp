"""
    Methods for interacting with PT-table:
        - conversion to human-readable format
        - data parsing
"""
import sys
import shutil
import os
import numpy as np


def convert_pttable(request_id: int) -> None:
    """
        Converts PT-table binary file into human-readable format.
    """
    points_per_record = 20481
    record_wv_span = 10  # one record spans 10 cm-1 of absorption data
    pttable_basename = 'pt-table.ptbin'
    directory = f"media/users/{request_id}"

    if not os.path.isdir(directory):
        print(f"Error: Directory {directory} does not exist.")
        sys.exit(1)

    pttable_file = os.path.join(directory, pttable_basename)
    if not os.path.exists(pttable_file):
        print(f"File {pttable_file} does not exist.")
        sys.exit(2)

    info_filename = os.path.join(directory, 'info.txt')
    if not os.path.isfile(info_filename):
        print(f"Error: info.txt file not found in {directory}")
        sys.exit(3)

    v1, v2 = None, None

    with open(info_filename) as info_file:
        for line in info_file.readlines():
            if line.startswith("Start Wavenumber"):
                v1 = float(line.split(':')[1])
            if line.startswith("End Wavenumber"):
                v2 = float(line.split(':')[1])

    if v1 is None or v2 is None:
        print(f"Error: Start or End wavenumbers are not defined in the info.txt file")
        sys.exit(5)

    shutil.copyfile(info_filename, os.path.join(directory, 'output.txt'))
    output_filename = os.path.join(directory, 'output.txt')

    start_record_number = int(v1 / 10.0)
    end_record_number = int((v2 - 1) / 10.0)
    num_records = end_record_number - start_record_number + 1
    step = record_wv_span / (points_per_record - 1)

    record_size = points_per_record * 4  # bytes
    data = []
    record_number = start_record_number
    with open(pttable_file, 'rb') as f:
        for j in range(1, num_records + 1):
            seek_position = (record_number - 1) * record_size
            if seek_position >= os.path.getsize(pttable_file):
                print(f"ERROR: Record number {record_number} exceeds a file size.")
                sys.exit(4)
            f.seek(seek_position)
            binary_abs_data = f.read(record_size)  # reads absorption data from one record

            abs_data = np.frombuffer(binary_abs_data, dtype=np.float32)

            in_record_start_wv = record_wv_span * record_number
            for i in range(points_per_record):
                vw = in_record_start_wv + i * step
                data.append((vw, abs_data[i]))

            record_number = start_record_number + j

    with open(output_filename, 'a') as output:
        for vw, abs_data in data:
            output.write(f"{vw:15.5f} {abs_data:17.7e}\n")
    return
