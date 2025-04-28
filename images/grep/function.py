import sys
import subprocess
import os
import json

import argparse


def execute_command(command):
    print(">_ " + command)
    subprocess.run(command.split())


def grep(n, find_str):
    filename = f"/mnt/ramdisk/video_deepspeech_output_{str(n)}.tar.gz"
    
    command = f"tar -xvzf {filename} -C /mnt/ramdisk/"
    execute_command(command)

    f = open(f"/mnt/ramdisk/transcript.txt", "r")
    content = f.read()
    if find_str in content:
        return filename
    
    return None


def handler(params, context):
    try:
        f = open("/mnt/ramdisk/params.txt", "r")
        find_str = f.read().strip()
        f.close()

        input_folder = "/mnt/ramdisk/"
        for file in os.listdir(input_folder):
            if "video_deepspeech_output_" in file and file.endswith(".tar.gz"):
                i = file.split("_")[-1].split(".")[0]
                res = grep(i, find_str)
                if res:
                    return res

    except Exception as e:
        f = open("/mnt/ramdisk/error.txt", "w")
        f.write(str(e))
        f.close()
    
    return 'No results found'
