docker stop $(docker ps -q -a)
docker rm $(docker ps -q -a)
docker volume rm $(docker volume ls -q)
docker rmi $(docker images -q -a)