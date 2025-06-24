bin/serverledge-cli delete -f deepspeech

bin/serverledge-cli create -f deepspeech \
    --cpu 1.0 \
    --memory 1024 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-deepspeech \
    --input "dir:Text" --output "dir:Text"

# Create input file into /mnt/ramdisk

bin/serverledge-cli delete-workflow -f deepspeech_0
bin/serverledge-cli create-workflow -f deepspeech_0 -s ~/serverledge/examples/custom/deepspeech.json