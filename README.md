# Docker Instructions

## Build the Docker image

docker build -t my-app .

## Run the Docker container

docker run -p 3000:3000 my-app

Your application will be accessible at http://localhost:3000

## Notes
- Make sure your app works locally before building the Docker image.
- If you change code, rebuild the image before running again.
- The Dockerfile builds both frontend and backend, then starts the server.
