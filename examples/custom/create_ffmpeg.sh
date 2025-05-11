bin/serverledge-cli delete -f ffmpeg_0

bin/serverledge-cli create -f ffmpeg_0 \
    --cpu 1.0 \
    --memory 100 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-ffmpeg_0 \
    --input "dir:Text" --output "dir:Text"

# Create input file into /mnt/ramdisk

bin/serverledge-cli delete-workflow -f ffmpeg
bin/serverledge-cli create-workflow -f ffmpeg -s ~/serverledge/examples/custom/ffmpeg.json