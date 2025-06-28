"""
Authors:
    Mikhail Razumovskii and Denis Astanin, 2025

Description:
    This module is a part of the MARFA-webapp project.
"""
import shutil
import subprocess
import gc
from pathlib import Path
from typing import Tuple

import numpy as np
from marfa_app.settings import SPECTRES_ROOT, BASE_DIR, MEDIA_ROOT, INFO_FILENAME, PT_FILENAME
from spectres.models import Spectre
import matplotlib.pyplot as plt
import matplotlib
import io


def create_spectre_directory(identifier: int) -> Path:
    """
    Creates a directory for the spectre calculation based on its identifier.

    Args:
        identifier (int): The unique identifier for the spectre.

    Returns:
        Path: The path to the created spectre directory.
    """
    directory = Path(SPECTRES_ROOT) / str(identifier)
    directory.mkdir(parents=True, exist_ok=True)
    return directory


def calculate_absorption_spectre(spectre: Spectre) -> Tuple[str, str]:
    """
    Executes the Fortran executable to perform absorption calculations and
    generate a PT-table with results based on the given spectral parameters.

    Args:
        spectre (Spectre): An instance of the `Spectre` class containing
            the necessary parameters for the absorption calculation

    Returns:
        Tuple[str, str]: A tuple containing:
            - stdout (str): The standard output from the Fortran executable.
            - stderr (str): The standard error from the Fortran executable.
    """
    arguments = [
        'fpm', 'run', 'marfa', '--',
        f'{spectre.species}',
        f'{spectre.v_start}',
        f'{spectre.v_end}',
        f'{spectre.database_slug}',
        f'{spectre.line_cut_off}',
        f'{spectre.pressure}',
        f'{spectre.temperature}',
        f'{spectre.target_value}',
        f'{spectre.density}',
        f'{spectre.pk}',
    ]
    directory = Path(BASE_DIR) / 'core'

    result = subprocess.run(
        args=arguments,
        cwd=directory,
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout, result.stderr


def generate_log_files(directory: Path, stdout_content: str, stderr_content: str) -> None:
    """
    Creates log files (`stdout.log` and `stderr.log`) in the specified directory
    based on the results of the absorption calculation.

    Args:
        directory (Path): The directory where the log files will be generated.
        stdout_content (str): The content to be written to `stdout.log`.
        stderr_content (str): The content to be written to `stderr.log`.

    Returns:
        None: This function does not return anything.
    """

    log_files = {
        'stdout.log': stdout_content,
        'stderr.log': stderr_content,
    }

    for basename, content in log_files.items():
        logfile = directory / basename
        logfile.write_text(content or "")


def check_output_files(directory: Path) -> bool:
    """
    Checks for the existence of required output files in the specified directory.

    This function verifies if the generated PT-table file (`PT_FILENAME`)
    and the metadata file (`info.txt`) exist in the given directory. If either
    of the files is missing, it raises a `FileNotFoundError`.

    Args:
        directory (Path): The directory path where the output files are expected
            to be located.

    Returns:
        bool: Returns `True` if both files exist.
    """
    if not (Path(directory / PT_FILENAME).is_file() and Path(directory / INFO_FILENAME).is_file()):
        raise FileNotFoundError('Either PT-table file or info file does not exist.')
    return True


def generate_zip_archive(directory: Path) -> Path:
    """
    Generates archive of the spectre directory inside the MEDIA_ROOT directory.
    The archive is named like <id>.zip, where <id> is the unique identifier for the spectre.
    Zip archive populates the FileField of the Spectre model, so it must be saved inside the
    MEDIA_ROOT directory.

    Args:
        directory(Path): The spectre directory.

    Returns:
        Path: The path to the generated zip archive.
    """
    archive_name = shutil.make_archive(
        base_name=str(Path(MEDIA_ROOT) / directory.name),
        format='zip',
        root_dir=SPECTRES_ROOT,
        base_dir=str(directory.name),
    )
    return Path(archive_name)


def generate_plot(x_data: list[np.float32], y_data: list[np.float32], y_title: str) -> str:
    """
    Generates a plot using matplotlib and returns it in SVG format.

    Args:
        x_data(list[np.float32]): X-axis data
        y_data(list[np.float32]): Y-axis data
        y_title(str): Title of chart

    Returns:
        str: string with svg image
    """
    matplotlib.use("agg")
    plt.figure(figsize=(12, 6))
    fig, ax = plt.subplots()
    y_title = (
        f'Absorption Cross-Section [cm$^{{2}}$ mol$^{{-1}}$]'
        if y_title == 'ACS'
        else f'Volume Absorption Coefficient [km$^{{-1}}$]'
    )
    y_data = np.log10(y_data)

    ax.plot(x_data, y_data, color='g', linestyle='-')

    ax.set_xlabel(r'Wavenumber [$\mathregular{cm^{-1}}$]')
    ax.set_ylabel(y_title)
    ax.grid(which='major', axis='both', color='gray', alpha=0.5)

    ax.minorticks_on()
    ax.tick_params(axis='y', which='both', right=True)
    ax.autoscale(enable=True, axis='both', tight=True)

    svg_buffer = io.StringIO()
    plt.savefig(svg_buffer, format='svg', bbox_inches='tight')
    plt.close(fig)

    svg_content = svg_buffer.getvalue()
    svg_buffer.close()

    gc.collect()

    return svg_content
