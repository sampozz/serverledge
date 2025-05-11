bin/serverledge-cli delete -f ffmpeg_0
bin/serverledge-cli delete -f librosa
bin/serverledge-cli delete -f ffmpeg_1
bin/serverledge-cli delete -f ffmpeg_2
bin/serverledge-cli delete -f deepspeech
bin/serverledge-cli delete -f grep

bin/serverledge-cli create -f ffmpeg_0 \
    --cpu 0.1 \
    --memory 100 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-ffmpeg_0 \
    --input "dir:Text" --output "dir:Text"

bin/serverledge-cli create -f librosa \
    --cpu 0.5 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-librosa \
    --input "dir:Text" --output "dir:Text"

bin/serverledge-cli create -f ffmpeg_1 \
    --cpu 0.1 \
    --memory 100 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-ffmpeg_1 \
    --input "dir:Text" --output "dir:Text"

bin/serverledge-cli create -f ffmpeg_2 \
    --cpu 1.5 \
    --memory 100 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-ffmpeg_2 \
    --input "dir:Text" --output "dir:Text"

bin/serverledge-cli create -f deepspeech \
    --cpu 2 \
    --memory 500 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-deepspeech \
    --input "dir:Text" --output "dir:Text"

bin/serverledge-cli create -f grep \
    --cpu 0.1 \
    --memory 100 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-grep \
    --input "dir:Text" --output "output:Text"

# Create input file into /mnt/ramdisk

bin/serverledge-cli delete-workflow -f videosearcher_0
bin/serverledge-cli create-workflow -f videosearcher_0 -s ~/serverledge/examples/custom/videosearcher.json