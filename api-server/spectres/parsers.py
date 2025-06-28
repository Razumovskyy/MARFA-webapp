"""
Authors:
    Mikhail Razumovskii and Denis Astanin, 2025

Description:
    This module is a part of the MARFA-webapp project.
"""
import math
import os
import shutil
from pathlib import Path

import numpy as np

from marfa_app.settings import PT_FILENAME, INFO_FILENAME, OUTPUT_FILENAME
from spectres.models import Spectre
from spectres.utils import create_spectre_directory

POINTS_PER_RECORD = 20481
RECORD_WV_SPAN = 10  # one record spans 10 cm-1 of absorption data
RECORD_SIZE = POINTS_PER_RECORD * 4  # 4 bytes per each value


def base_parser(pttable_file: Path, v1: float, v2: float) -> tuple[list[np.float32], list[np.float32]]:
    """
    Parse data from a pt-table binary file based on left and right spectral boundaries.

    This function reads a binary pt-table file, extracts absorption data within the
    spectral range defined by v1 and v2, and calculates corresponding wavenumbers.
    It processes records sequentially within the specified boundaries and returns
    two lists: one for the calculated wavenumbers and one for the absorption data.

    Args:
        pttable_file (Path): Path to the binary pt-table file containing absorption data.
        v1 (float): Left spectral boundary (starting value).
        v2 (float): Right spectral boundary (ending value).

    Returns:
        tuple[list[np.float32], list[np.float32]]:
            - First element: List of wavenumber values (vw_data) as np.float32.
            - Second element: List of corresponding absorption values as np.float32.
    """
    start_record_number = int(v1 / 10.0)
    end_record_number = int((math.ceil(v2) - 1) / 10.0)
    num_records = end_record_number - start_record_number + 1
    step = RECORD_WV_SPAN / (POINTS_PER_RECORD - 1)

    vw_data = []
    absorption_data = []
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
                vw_data.append(np.float32(vw))
                absorption_data.append(np.float32(abs_data[i]))

            record_number = start_record_number + j
    return vw_data, absorption_data


def convert_pttable(directory: Path) -> None:
    """
    Converts a PT-table binary file inside a given directory into a human-readable format.

    It reads the start and end wavenumbers from an `info.txt` file in the same directory, extracts 
    the relevant absorption data, and formats it into a readable table.

    Args:
        directory (Path): The directory containing the PT-table binary file 
                                and the associated file.
    """

    pttable_file = directory / PT_FILENAME
    info_file = directory / INFO_FILENAME

    v1, v2 = None, None

    with open(info_file) as info:
        for line in info.readlines():
            if line.startswith("Start Wavenumber"):
                v1 = float(line.split(':')[1])
            if line.startswith("End Wavenumber"):
                v2 = float(line.split(':')[1])

    if v1 is None or v2 is None:
        raise ValueError(f"Corrupted info file: start or end wavenumbers are not defined")

    output_file = shutil.copyfile(info_file, directory / OUTPUT_FILENAME)

    vw_data, absorption_data = base_parser(pttable_file, v1, v2)

    with open(output_file, 'a') as output:
        for vw, abs_data in zip(vw_data, absorption_data):
            output.write(f"{vw:15.5f} {abs_data:17.7e}\n")


def plot_parser(spectre: Spectre, vl: float, vr: float) -> tuple[list[np.float32], list[np.float32]]:
    """
    Validates input boundaries for plots requests

    Args:
        spectre (Spectre): Spectre instance
        vl (float): left boundary
        vr (float): right boundary

    Returns:
        list[np.float32]: x-axis data
        list[np.float32]: y-axis data
    """
    if not spectre.v_start <= vl < vr <= spectre.v_end:
        raise ValueError(f"Left and right boundaries requested for plotting: {vl}, {vr} cm-1 are "
                         f"outside the spectre range: {spectre.v_start}, {spectre.v_end} cm-1.")
    spectre_dir = create_spectre_directory(spectre.pk)
    x_data, y_data = base_parser(spectre_dir / Path(PT_FILENAME), vl, vr)
    return x_data, y_data
