serverledge/bin/serverledge-cli delete -f deepspeech

serverledge/bin/serverledge-cli create -f deepspeech \
    --cpu 1.0 \
    --memory 1024 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image deepspeech \
    --input "dir:Text" --output "dir:Text"

# Create input file into /mnt/ramdisk

serverledge/bin/serverledge-cli delete-workflow -f deepspeech_0
serverledge/bin/serverledge-cli create-workflow -f deepspeech_0 -s ~/serverledge/examples/videosearcher/deepspeech.json