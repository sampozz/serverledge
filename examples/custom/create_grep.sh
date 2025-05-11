bin/serverledge-cli delete -f grep

bin/serverledge-cli create -f grep \
    --cpu 0.1 \
    --memory 100 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image serverledge-grep \
    --input "dir:Text" --output "output:Text"

# Create input file into /mnt/ramdisk

bin/serverledge-cli delete-workflow -f grep_0
bin/serverledge-cli create-workflow -f grep_0 -s ~/serverledge/examples/custom/grep.json