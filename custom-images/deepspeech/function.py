import sys
import subprocess
import os
import argparse

# from aisprint.annotations import annotation


def execute_command(command):
    print(">_ " + command)
    subprocess.run(command.split())


def get_command_output(command):
    print(">_ " + command)
    return subprocess.run(command.split(), capture_output=True)


def deepspeech(i):
    orig_input = f"/mnt/ramdisk/video_ffmpeg_2_output_{str(i)}.tar.gz"
    orig_output = f"/mnt/ramdisk/video_deepspeech_output_{str(i)}"

    input_dir = os.path.dirname(orig_input)
    output_dir = os.path.dirname(orig_output)
    output_name = os.path.basename(orig_output)

    archive_name = output_name + ".tar.gz"
    video_name = output_name + ".mp4"
    video_path = os.path.join(output_dir, video_name)
    
    command = "tar -xvzf %s -C %s" % (orig_input, input_dir)
    execute_command(command)
    
    model = "/opt/videosearcher/deepspeech-0.9.3-models.pbmm"
    scorer = "/opt/videosearcher/deepspeech-0.9.3-models.scorer"
    audio_path = orig_input.replace(".tar.gz", ".wav")

    command = "deepspeech --model %s --scorer %s --audio %s" % (model, scorer, audio_path)
    # command = "whisper %s --model tiny --output_format txt" % (audio_path)
    output = get_command_output(command)
    print(output.stdout.decode('utf-8'))
    # command = f"mv video_ffmpeg_2_output_{i}.txt {os.path.join(output_dir, 'transcript.txt')}"

    with open(os.path.join(output_dir, "transcript.txt"), "w") as file:
        file.write(output.stdout.decode('utf-8'))

    execute_command("cp %s %s" % (orig_input.replace(".tar.gz", ".mp4"), video_path))
    os.chdir(output_dir)
    execute_command("tar -czvf %s %s %s" % (archive_name, video_name, "transcript.txt"))
    execute_command("rm " + video_name)
    execute_command("rm " + "transcript.txt")
    execute_command("rm " + audio_path)
    execute_command("rm " + audio_path.replace(".wav", ".mp4"))


def handler(params, context):
    try:
        input_folder = "/mnt/ramdisk/"
        for file in os.listdir(input_folder):
            if "video_ffmpeg_2_output_" in file and file.endswith(".tar.gz"):
                i = file.split("_")[-1].split(".")[0]
                deepspeech(i)
                execute_command("rm " + os.path.join(input_folder, file.replace(".tar.gz", ".mp4")))
                execute_command("rm " + os.path.join(input_folder, file.replace(".tar.gz", ".wav")))
    except Exception as e:
        f = open("/mnt/ramdisk/error.txt", "w")
        f.write(str(e))
        f.close()
        
    return "video.mp4"

