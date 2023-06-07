FROM nginx:1.17.1-alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/html
COPY $ENV_FILE /.env
