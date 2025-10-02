//GitHub link

# Builds the Docker image
docker build -t my-app .

# Run the Docker container
docker run -p 3000:3000 my-app

Your application will be accessible at http://localhost:3000

# List running containers
docker ps

# Stop a running container
docker stop <container_id>

# List all containers (including stopped)
docker ps -a

# Delete a container
docker rm <container_id>

# List all images
docker images

# Delete an image
docker rmi <image_id>