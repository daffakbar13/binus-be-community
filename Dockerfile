FROM node:16-alpine
WORKDIR /usr/src/app
COPY ./package.json /package.json
RUN yarn install --no-lockfile
COPY ./tsconfig.json /tsconfig.json
RUN yarn run build 
COPY . .
EXPOSE 2205
ENV NODE_ENV=production
CMD [ "yarn", "start" ]
