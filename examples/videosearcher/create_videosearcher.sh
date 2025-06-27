serverledge/bin/serverledge-cli delete -f ffmpeg_0
serverledge/bin/serverledge-cli delete -f librosa
serverledge/bin/serverledge-cli delete -f ffmpeg_1
serverledge/bin/serverledge-cli delete -f ffmpeg_2
serverledge/bin/serverledge-cli delete -f deepspeech
serverledge/bin/serverledge-cli delete -f grep

serverledge/bin/serverledge-cli create -f ffmpeg_0 \
    --cpu 1 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image ffmpeg_0 \
    --input "dir:Text" --output "dir:Text"

serverledge/bin/serverledge-cli create -f librosa \
    --cpu 1 \
    --memory 1024 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image librosa \
    --input "dir:Text" --output "dir:Text"

serverledge/bin/serverledge-cli create -f ffmpeg_1 \
    --cpu 1 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image ffmpeg_1 \
    --input "dir:Text" --output "dir:Text"

serverledge/bin/serverledge-cli create -f ffmpeg_2 \
    --cpu 1 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image ffmpeg_2 \
    --input "dir:Text" --output "dir:Text"

serverledge/bin/serverledge-cli create -f deepspeech \
    --cpu 2 \
    --memory 1024 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image deepspeech \
    --input "dir:Text" --output "dir:Text"

serverledge/bin/serverledge-cli create -f grep \
    --cpu 1 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image grep \
    --input "dir:Text" --output "output:Text"

# Create input file into /mnt/ramdisk

serverledge/bin/serverledge-cli delete-workflow -f videosearcher_0
serverledge/bin/serverledge-cli create-workflow -f videosearcher_0 -s ~/serverledge/examples/videosearcher/videosearcher.json