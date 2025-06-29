docker compose exec -it serverledge bin/serverledge-cli delete -f deepspeech

docker compose exec -it serverledge bin/serverledge-cli create -f deepspeech \
    --cpu 1.0 \
    --memory 1024 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image deepspeech \
    --input "dir:Text" --output "dir:Text"

docker compose cp ./examples/videosearcher/deepspeech.json serverledge:/app/deepspeech.json 

docker compose exec -it serverledge bin/serverledge-cli delete-workflow -f deepspeech_0
docker compose exec -it serverledge bin/serverledge-cli create-workflow -f deepspeech_0 -s /app/deepspeech.json