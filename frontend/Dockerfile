# Build step 1: React
FROM node:18-alpine as build-step
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# build step 2: nginx
FROM nginx:stable-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY /etc/letsencrypt/options-ssl-nginx.conf /etc/nginx/options-ssl-nginx.conf
COPY /etc/letsencrypt/ssl-dhparams.pem /etc/nginx/ssl-dhparams.pem