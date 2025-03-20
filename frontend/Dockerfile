# Build step 1: React
FROM node:18-alpine as build-step
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Use .env.production by default for Docker builds
RUN cp .env.production .env.local
RUN npm run build

# build step 2: nginx
FROM nginx:stable-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf