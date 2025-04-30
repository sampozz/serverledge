import sys
import subprocess
import os
import json

import argparse

from aisprint.annotations import annotation


def execute_command(command):
    print(">_ " + command)
    subprocess.run(command.split())


def handler(params, context):
    params['input'] = 'video.mp4'

    print("Starting ffmpeg_0 function")

    def execute_command(command):
        print(">_ " + command)
        subprocess.run(command.split())

    input_file = params['input']
    input_name = input_file.split('.')[0]
    input_path = f"/mnt/ramdisk/{input_file}"
    output_name = f"{input_name}_ffmpeg_0_output"
    output_dir = '/mnt/ramdisk/'

    print(f"SCRIPT: Input at '{input_path}', saving output in '{output_dir}/{output_name}'")

    archive_name = output_name + ".tar.gz"
    video_name = output_name + ".mp4"
    audio_name = output_name + ".wav"

    video_path = os.path.join(output_dir, video_name)
    audio_path = os.path.join(output_dir, audio_name)

    execute_command("ffmpeg -i %s -map 0:a %s" % (input_path, audio_path))
    execute_command("cp %s %s" % (input_path, video_path))
    os.chdir(output_dir)
    execute_command("tar -czvf %s %s %s" % (archive_name, video_name, audio_name))
    execute_command("rm " + video_name)
    execute_command("rm " + audio_name)
    
    return "video.mp4"
