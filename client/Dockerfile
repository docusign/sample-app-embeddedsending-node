FROM --platform=linux/amd64 node:20.14 AS base

# Declare build arguments from docker-compose.local.yaml. Set default arguments
ARG NODE_ENV=development
ARG BACKEND_DEV_HOST=http://localhost:80/api

RUN mkdir -p /home/vite/app
RUN npm config set cache /tmp --global
WORKDIR /home/vite
COPY .env ./

WORKDIR /home/vite/app
COPY ./client/package.json ./client/package-lock.json ./
RUN npm ci

COPY client ./

# Set environment variables from build arguments
ENV NODE_ENV=${NODE_ENV}
ENV BACKEND_DEV_HOST=${BACKEND_DEV_HOST}

RUN npm run build

# Run stage
FROM --platform=linux/amd64 nginx:1.23.2-alpine
COPY --from=base /home/vite/app/dist /var/www/app
COPY ./infra/nginx/conf/ /etc/nginx/conf.d
EXPOSE 80 443