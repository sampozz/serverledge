docker compose exec -it serverledge bin/serverledge-cli delete -f ffmpeg_0
docker compose exec -it serverledge bin/serverledge-cli delete -f librosa
docker compose exec -it serverledge bin/serverledge-cli delete -f ffmpeg_1
docker compose exec -it serverledge bin/serverledge-cli delete -f ffmpeg_2
docker compose exec -it serverledge bin/serverledge-cli delete -f deepspeech
docker compose exec -it serverledge bin/serverledge-cli delete -f grep

docker compose exec -it serverledge bin/serverledge-cli create -f ffmpeg_0 \
    --cpu 1 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image ffmpeg_0 \
    --input "dir:Text" --output "dir:Text"

docker compose exec -it serverledge bin/serverledge-cli create -f librosa \
    --cpu 1 \
    --memory 1024 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image librosa \
    --input "dir:Text" --output "dir:Text"

docker compose exec -it serverledge bin/serverledge-cli create -f ffmpeg_1 \
    --cpu 1 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image ffmpeg_1 \
    --input "dir:Text" --output "dir:Text"

docker compose exec -it serverledge bin/serverledge-cli create -f ffmpeg_2 \
    --cpu 1 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image ffmpeg_2 \
    --input "dir:Text" --output "dir:Text"

docker compose exec -it serverledge bin/serverledge-cli create -f deepspeech \
    --cpu 1 \
    --memory 1024 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image deepspeech \
    --input "dir:Text" --output "dir:Text"

docker compose exec -it serverledge bin/serverledge-cli create -f grep \
    --cpu 1 \
    --memory 200 \
    --runtime custom  \
    --handler "function.handler" \
    --custom_image grep \
    --input "dir:Text" --output "output:Text"

docker compose cp ./examples/videosearcher/videosearcher.json serverledge:/app/videosearcher.json 

docker compose exec -it serverledge bin/serverledge-cli delete-workflow -f videosearcher_0
docker compose exec -it serverledge bin/serverledge-cli create-workflow -f videosearcher_0 -s /app/videosearcher.json