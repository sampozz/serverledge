import librosa
import sys
import time
import math
import os
import argparse
import subprocess
import json

from aisprint.annotations import annotation

def handler(params, context):
    try:
        return librosa_handler(params, context)
    except Exception as e:
        params['error'] = str(e)
        return params


def execute_command(command):
    print(">_ " + command)
    subprocess.run(command.split())


def samples_to_timestamp(sample, is_start):
    time_in_seconds = sample / 22050
    if is_start:
        time_in_seconds = math.floor(time_in_seconds)
    else:
        time_in_seconds = math.ceil(time_in_seconds)
    formatted_time = time.strftime('%H:%M:%S', time.gmtime(time_in_seconds))
    return formatted_time, time_in_seconds


def librosa_handler(params, context):
    input_dir = f'/mnt/ramdisk/{params["dir"]}'

    name = 'video'
    input_name = f'{name}_ffmpeg_0_output'
    input_path = f"{input_dir}/{input_name}"
    output_dir = input_dir
    output_name = f'{name}_librosa_output'
    output_path = f"{input_dir}/{output_name}"

    command = "tar -xvzf %s -C %s" % (f"{input_path}.tar.gz", output_dir)
    execute_command(command)

    audio_file_path = input_path + ".wav"
    video_file_path = input_path + ".mp4"

    audio, sr = librosa.load(audio_file_path, sr=22050, mono=True)
    duration = librosa.get_duration(audio)
    
    max_sentence_lenght = 30
    min_sentence_lenght = 6

    min_clips_number = duration / max_sentence_lenght
    max_clips_number = duration / min_sentence_lenght
    
    for threshold_db in range(24, 50):
        clips = librosa.effects.split(audio, top_db=threshold_db)
        print(">_ %s clips with %s dB as treshold" % (len(clips), threshold_db))
        if len(clips) >= min_clips_number and len(clips) < max_clips_number:
            break

    with open(output_dir + "/timestamps.txt", "w") as file:
        last_timestamp = "00:00:00"
        last_seconds = 0
        for i in range(len(clips)):
            c = clips[i]
            # start = samples_to_timestamp(c[0], True)
            start_timestamp = last_timestamp
            start_seconds = last_seconds
            end_timestamp, end_seconds = samples_to_timestamp(c[1], False)
            clip_lenght = end_seconds - start_seconds
            if start_seconds != end_timestamp and clip_lenght > min_sentence_lenght:
                file.write(start_timestamp + " " + end_timestamp + "\n")
                last_timestamp = end_timestamp
                last_seconds = end_seconds

    os.chdir(output_dir)

    audio_file_name = output_name + ".wav"
    video_file_name = output_name + ".mp4"

    execute_command("cp " + video_file_path + " " + video_file_name)
    command = "tar -cvzf %s %s %s" % (output_name + ".tar.gz", "timestamps.txt", video_file_name)
    execute_command(command)
    execute_command("rm " + "timestamps.txt")
    execute_command("rm " + audio_file_path)
    execute_command("rm " + video_file_path)
    execute_command("rm " + video_file_name)

    return params