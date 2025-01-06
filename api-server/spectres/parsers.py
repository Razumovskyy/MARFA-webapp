"""
Authors:
    Mikhail Razumovskii and Denis Astanin, 2025

Description:
    This module is a part of the MARFA-webapp project.
"""
import os
import shutil
from pathlib import Path

import numpy as np

POINTS_PER_RECORD = 20481
RECORD_WV_SPAN = 10  # one record spans 10 cm-1 of absorption data
RECORD_SIZE = POINTS_PER_RECORD * 4  # 4 bytes per each value


def convert_pttable(directory: Path) -> None:
    """
    Converts a PT-table binary file inside a given directory into a human-readable format.

    It reads the start and end wavenumbers from an `info.txt` file in the same directory, extracts 
    the relevant absorption data, and formats it into a readable table.

    Parameters:
        directory (Path): The directory containing the PT-table binary file 
                                  (`pt-table.ptbin`) and the associated `info.txt` file.

    Raises:
        ValueError: If the `info.txt` file is corrupted or does not contain valid start and end 
                    wavenumber information.
        IndexError: If the record number, record size and file size are inconsistent.
        FileNotFoundError: If `pt-table.ptbin` or `info.txt` is missing in the spectre directory.

    Output:
        - Copies the contents of `info.txt` file to the beginning of the `output.dat` file.
        - Appends formatted wavenumber and absorption coefficient data to `output.dat`.
          Each line contains:
              - Wavenumber (float): The specific wavenumber in cm⁻¹.
              - Absorption coefficient (float): The corresponding absorption value in scientific notation.
    """

    pttable_file = directory / 'pt-table.ptbin'
    info_file = directory / 'info.txt'

    v1, v2 = None, None

    with open(info_file) as info:
        for line in info.readlines():
            if line.startswith("Start Wavenumber"):
                v1 = float(line.split(':')[1])
            if line.startswith("End Wavenumber"):
                v2 = float(line.split(':')[1])

    if v1 is None or v2 is None:
        raise ValueError(f"Corrupted info file: start or end wavenumbers are not defined")

    output_file = shutil.copyfile(info_file, directory / 'output.dat')

    start_record_number = int(v1 / 10.0)
    end_record_number = int((v2 - 1) / 10.0)
    num_records = end_record_number - start_record_number + 1
    step = RECORD_WV_SPAN / (POINTS_PER_RECORD - 1)

    data = []
    record_number = start_record_number
    with open(pttable_file, 'rb') as f:
        for j in range(1, num_records + 1):
            seek_position = (record_number - 1) * RECORD_SIZE
            if seek_position >= os.path.getsize(pttable_file):
                raise IndexError(f"Record number {record_number} exceeds a file size.")
            f.seek(seek_position)
            binary_abs_data = f.read(RECORD_SIZE)  # reads absorption data from one record

            abs_data = np.frombuffer(binary_abs_data, dtype=np.float32)

            in_record_start_wv = RECORD_WV_SPAN * record_number
            for i in range(POINTS_PER_RECORD):
                vw = in_record_start_wv + i * step
                data.append((vw, abs_data[i]))

            record_number = start_record_number + j

    with open(output_file, 'a') as output:
        for vw, abs_data in data:
            output.write(f"{vw:15.5f} {abs_data:17.7e}\n")
