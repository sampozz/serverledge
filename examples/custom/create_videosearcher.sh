bin/serverledge-cli delete -f ffmpeg_0
bin/serverledge-cli delete -f librosa
bin/serverledge-cli delete -f ffmpeg_1
bin/serverledge-cli delete -f ffmpeg_2
bin/serverledge-cli delete -f deepspeech
bin/serverledge-cli delete -f grep

bin/serverledge-cli create -f ffmpeg_0 \
    --cpu 1.0 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-ffmpeg_0 \
    --input "input:Text" --output "output:Text"

bin/serverledge-cli create -f librosa \
    --cpu 1.0 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-librosa \
    --input "input:Text" --output "output:Text"

bin/serverledge-cli create -f ffmpeg_1 \
    --cpu 1.0 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-ffmpeg_1 \
    --input "input:Text" --output "output:Text"

bin/serverledge-cli create -f ffmpeg_2 \
    --cpu 1.0 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-ffmpeg_2 \
    --input "input:Text" --output "output:Text"

bin/serverledge-cli create -f deepspeech \
    --cpu 1.0 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-deepspeech \
    --input "input:Text" --output "output:Text"

bin/serverledge-cli create -f grep \
    --cpu 1.0 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-grep \
    --input "input:Text" --output "output:Text"

# Create input file into /mnt/ramdisk

bin/serverledge-cli delete-workflow -f videosearcher_0
bin/serverledge-cli create-workflow -f videosearcher_0 -s ~/prog/serverledge/examples/custom/videosearcher.json