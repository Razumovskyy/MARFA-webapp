"""
Authors:
    Mikhail Razumovskii and Denis Astanin, 2025

Description:
    This module is a part of the MARFA-webapp project.
"""
import shutil
import subprocess
from pathlib import Path

from marfa_app.settings import SPECTRES_ROOT, BASE_DIR, MEDIA_ROOT, CURRENT_HOST, MEDIA_URL
from spectres.models import Spectre


def create_spectre_directory(identifier: int) -> Path:
    """
    Creates a directory for the spectre calculation based on its identifier.

    Args:
        identifier (int): The unique identifier for the spectre.

    Returns:
        Path: The path to the created spectre directory.
    """
    directory = Path(SPECTRES_ROOT) / str(identifier)
    directory.mkdir(parents=True)
    return directory


def calculate_absorption_spectre(spectre: Spectre) -> None:
    """
    Calls fortran executable to generate PT-table for calculation request.
    Checks that the PT-table exists and is located in the correct place.

    Args:
        spectre (Spectre): The spectre instance.

    Returns:
        Path: The path to the generated PT-table.
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
        f'{spectre.density}',
        f'{spectre.target_value}',
        f'{spectre.pk}',
    ]
    directory = Path(BASE_DIR) / 'core'
    subprocess.run(
        args=arguments,
        cwd=directory,
        capture_output=True,
        text=True,
        check=True,
    )


def check_output_files(directory: Path) -> bool:
    """
    Helper function for checking if the generated PT-table exists along with info.txt file with metadata.
    """
    if not (Path(directory / 'pt-table.ptbin').is_file() and Path(directory / 'info.txt').is_file()):
        raise RuntimeError('Either PT-table file or info file does not exist.')
    return True


def generate_zip_archive(directory: Path) -> Path:
    """
    Generates archive of the spectre directory inside the MEDIA_ROOT directory.
    The archive is named like <id>.zip, where <id> is the unique identifier for the spectre.

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
    return Path(CURRENT_HOST) / Path(MEDIA_URL) / archive_name
