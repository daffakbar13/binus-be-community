#FROM nginx:1.17.1-alpine
#WORKDIR /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY dist/ /usr/share/nginx/html
#COPY $ENV_FILE /.env

FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

COPY .env .env

COPY . .

RUN yarn install

RUN yarn build

RUN ls -lah

COPY . .

EXPOSE 2205

CMD [ "yarn", "start" ]
