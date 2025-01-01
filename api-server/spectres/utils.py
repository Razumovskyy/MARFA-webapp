import sys
import shutil
import os
import numpy as np

def convert_pttable(dir, V1, V2):
    NT = 20481
    deltaWV = 10
    pttable_basename = 'pt-table.ptbin'

    if not os.path.isdir(dir):
        print(f"Error: Directory {dir} does not exist.")
        sys.exit(1)

    pttable_file = os.path.join(dir, pttable_basename)
    if not os.path.exists(pttable_file):
        print(f"File {pttable_file} does not exist.")
        sys.exit(2)

    info_filename = os.path.join(dir, 'info.txt')
    if not os.path.isfile(info_filename):
        print(f"Error: info.txt file not found in {dir}")
        sys.exit(3)

    shutil.copyfile(info_filename, os.path.join(dir, 'output.txt'))
    output_filename = os.path.join(dir, 'output.txt')

    step = deltaWV / (NT-1)

    NZ1 = int(V1 / 10.0)
    NZ2 = int((V2 - 1) / 10.0)
    count = NZ2 - NZ1 + 1

    record_length = NT * 4
    data = []
    record_number = NZ1
    with open(pttable_file, 'rb') as f:
        for II in range(1, count + 1):

            seek_position = (record_number - 1) * record_length
            if seek_position >= os.path.getsize(pttable_file):
                sys.exit(f"ERROR: Record number {record_number} exceeds file size.")
            f.seek(seek_position)
            record_bytes = f.read(record_length)

            RK = np.frombuffer(record_bytes, dtype='<f4')
            RK = RK.astype(np.float32)

            V11 = V1 + deltaWV * (II - 1)

            for I in range(1, int((NT + 1))):
                VV = V11 + (I - 1) * step
                RK_index = (I - 1)
                if RK_index >= NT:
                    break
                RK_value = RK[RK_index]
                data.append((VV, RK_value))

            record_number = NZ1 + II

    with open(output_filename, 'a') as output:
        for VV, RK in data:
            output.write(f"{VV:15.5f} {RK:17.7f}\n")
    return